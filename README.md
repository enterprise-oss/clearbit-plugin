# helloworldplugin
Posthog hello world plugin. Use it as a base for your own plugins!

## Setup via PostHog

1. Find the "plugins" page in PostHog
2. Either select the plugin from the list or copy the URL of this repository to install

## Setup via CLI

1. Install [posthog-cli](https://github.com/PostHog/posthog-cli)
2. Install this plugin: `posthog plugin install helloworldplugin`
3. Either use the plugins interface or edit `posthog.json` and add the required config variables:
```json
{
    "name": "helloworldplugin",
    "url": "https://github.com/enterpriseoss/clearbit-plugin",
    "global": {
        "enabled": true,
        "config": {
            "bar": "foo"
        }
    }
}
```
4. Run PostHog

## Questions?

### [Join our Slack community.](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ)
