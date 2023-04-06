# PostHog Integration for Node-RED

A set of work-in-progress Node-RED nodes to enable event genration and updating of Person attributes in PostHog.

## Capture
`posthog.capture()` - [docs](https://posthog.com/docs/libraries/node#capture)

Run PostHog's `capture()` via the "Capture" node. Node-RED makes it easy to set the `timestamp`, `event`, `distinctID` and `properties` via set values, or configurable through incoming `msg.` values.

<img width="1728" alt="Screenshot 2023-03-26 at 12 15 35" src="https://user-images.githubusercontent.com/99246719/227772052-9b5096af-59eb-460b-a661-f5d43a766431.png">

## Identify
`posthog.identify()` - [docs](https://posthog.com/docs/libraries/node#identify)

Identify lets you add metadata to your users so you can easily identify who they are in PostHog,
as well as do things like segment users by these properties.

An identify call requires:

- distinctId – a distinct ID belonging to the user
- properties – a user properties object

<img width="1728" alt="Screenshot 2023-04-06 at 08 52 34" src="https://user-images.githubusercontent.com/99246719/230310956-b6a97f5e-5d5c-456c-b217-a7e1375aa63c.png">

## Group
`posthog.groupIdentify()` - [docs](https://posthog.com/docs/libraries/node#group-analytics)

Group analytics allows you to associate an event with a group (e.g. teams, organizations, etc.).

<img width="1728" alt="Screenshot 2023-04-06 at 08 50 58" src="https://user-images.githubusercontent.com/99246719/230310661-fce1dcbc-be36-481c-b69a-2773a9e456df.png">