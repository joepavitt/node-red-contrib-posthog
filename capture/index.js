// const client = new PostHog(
//     'phc_Mc5OLqVXTkLPp5ZIaxcANIvsAt9bWAsfLZ4mVzAgNHi',
//     { host: 'https://app.posthog.com' } // You can omit this line if using PostHog Cloud
// )

// // On program exit, call shutdown to stop pending pollers and flush any remaining events
// await client.shutdownAsync()

module.exports = function(RED) {
    function PostHogCaptureNode(config) {
        RED.nodes.createNode(this, config);

        const node = this;
        node.event = config.event
        node.eventType = config.eventType

        this.project = RED.nodes.getNode(config.project);

        node.project.emitter.on('connected', (err) => {
            node.status({fill:"green", shape:"dot", text: 'Connected'});
        })

        node.project.emitter.on('error', (err) => {
            node.status({fill:"red", shape:"ring", text: err});
        })

        node.on('input', async function (msg, send, done) {

            console.log(config.props, config.propertiesType)

            const evt = RED.util.evaluateNodeProperty(config.event, config.eventType, node, msg)
            const props = RED.util.evaluateNodeProperty(config.properties, config.propertiesType, node, msg)
            var timestamp = RED.util.evaluateNodeProperty(config.timestamp, config.timestampType, node, msg)

            if (!timestamp) {
                timestamp = (new Date()).toISOString()
            }

            await node.project.client.capture({
                distinctId: 'Node-RED',
                event: evt,
                $lib: 'Node-RED',
                properties: props,
                timestamp: timestamp
            })

            done()
        });
        
    }

    RED.nodes.registerType("posthog-capture", PostHogCaptureNode);
}