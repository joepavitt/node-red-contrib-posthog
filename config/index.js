const { PostHog } = require('posthog-node')
const axios = require('axios');

const Emitter = require('events').EventEmitter

module.exports = function(RED) {

    const emitter = new Emitter()
    
    function PosthogProjectNode(n) {
        const node = this

        RED.nodes.createNode(node, n);

        // Expose hte emitter so that nodes can subscribe to the 'error' & 'connected' events
        node.emitter = emitter

        // Call PostHog API endpoint to check on Host & Project API Key validity
        // the NodeJS SDK does not provide this check as a fucntion or error event
        axios.post(`${n.host}/decide`, {
            api_key: node.credentials.apikey,
            distinct_id: ''
        }).then(res => {
            emitter.emit('connected')
        })
        .catch(err => {
            console.error(err)
            if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
                const err = `Invalid PostHog Host '${n.host}'.`
                emitter.emit('error', err)
                node.error(`${err} Valid example: 'https://app.posthog.com'`)
            } else if (err.response.status === 401) {
                const err = 'Invalid PostHog Project API Key'
                emitter.emit('error', err)
                node.error(err)
            }
        })

        // Setup a PostHog Client, which we will call in our respective nodes
        client = new PostHog(
            node.credentials.apikey,
            {
                host: `${n.host}`
            }
        )

        // Make sure we clean up after ourselves
        node.on('close', async function (done) {
            // TODO: ensure shutdown completes and doesn't error
            await client?.shutdownAsync()
            done()
        })
        
        node.client = client
    }

    RED.nodes.registerType("posthog-project", PosthogProjectNode, {
        credentials: {
            apikey: {type: "text"}
        }
    });
}