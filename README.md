# state-badge-modder

Allows you to style home-assistant lovelace state-badges

This card requires [card-tools](https://github.com/thomasloven/lovelace-card-tools) to be installed.

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

It is inspired by Thomas Lovén's [lovelace-card-modder](https://github.com/thomasloven/lovelace-card-modder).

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:state-badge-modder`
| card | object | **Required** | The card you wish to style
| thing | string | element | `card` or `element` Wether the root element that contains the state-card is an element (ex: `picture-elements`) or a card (ex: `glance`)
| style | list | none | List of css styles to apply to card
| state_badge_css | string | none | A style sheet url to add to the state-badge element(s)
| state_badge_styles | string | none | Extra style data to add to the state-badge element(s)

# Styling

state-badge-modder can be used to apply CSS styling to any lovelace card.

it will add thoses styles to the inner `state-badge` element(s).

(tested with `picture-elements` and `glance`)

Any CSS style can be used, and will be applied to all the `state-badge` element(s) of the card
(`<state-badge>`). Most cards use css variables for styling, and to find out which
ones, I recommend either the official ["partial list of variables
used"](https://github.com/home-assistant/home-assistant-polymer/blob/master/src/resources/ha-style.ts)
or that you open the card in your browsers object inspector and check out the
styling options manually.

```yaml
- type: picture-elements
  image: /local/floorplan/floorplan-map.svg
  elements:
    - type: custom:state-badge-modder
      card:
        type: state-icon
        entity: media_player.pc_universal
        hold_action:
          action: toggle
      style:
        bottom: 5%
        left: 8.6%
      state_badge_css: /local/custom-ui/state-badge.css?v=0.0.8
      state_badge_styles: >
        ha-icon[data-domain="media_player"][data-state="on"] {
          background-image: url('/local/entity/windows-10.jpg');
          color: transparent;
          border-radius: 50%;
          background-size: contain;
        }

- type: custom:state-badge-modder
  thing: card
  card:
    type: glance
    title: roupille
    show_name: false
    entities:
      - entity: sensor.roupille_krebs_tech
        icon: mdi:ip-network
      - sensor.roupille_expiry
      - entity: media_player.pc_universal
        name: pc
        hold_action:
          action: toggle
      - entity: sensor.pc_power
        name: ''
  state_badge_css: /local/custom-ui/state-badge.css?v=0.0.8
  state_badge_styles: >
    ha-icon[data-domain="media_player"][data-state="on"] {
      background-image: url('/local/entity/windows-10.jpg');
      color: transparent;
      border-radius: 50%;
      background-size: contain;
    }
```
