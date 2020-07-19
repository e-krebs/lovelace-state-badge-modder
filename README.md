# state-badge-modder

Allows you to style home-assistant lovelace state-badges

This card requires [card-tools](https://github.com/thomasloven/lovelace-card-tools) to be installed.

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:state-badge-modder`
| card | object | **Required** | The card you wish to style **(it is expected to be type: state-icon)**
| style | list | none | List of css styles to apply to card
| state_badge_css | string | none | A style sheet url to add to the state-badge element(s)
| extra_css | string | none | Another style sheet url to add to the state-badge element(s)

# Styling

state-badge-modder can be used to apply CSS styling on a **state-icon** card.

it will add thoses styles to the inner `state-badge` element(s).

Any CSS style can be used, and will be applied to all the `state-badge` element(s) of the card
(`<state-badge>`). Most cards use css variables for styling, and to find out which
ones, I recommend either the official ["partial list of variables
used"](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/resources/ha-style.ts)
or that you open the card in your browsers object inspector and check out the
styling options manually.

```yaml
type: custom:state-badge-modder
card:
  type: state-icon
  entity: media_player.pc_universal
  hold_action:
    action: toggle
style:
  bottom: 35.5%
  left: 40%
state_badge_css: /local/custom-ui/state-badge.css?v=0.0.14
extra_css: /local/custom-ui/pc-universal.css?v=0.0.1
```
