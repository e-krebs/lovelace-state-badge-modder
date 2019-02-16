customElements.whenDefined('card-tools').then(() => {
  class StateBadgeModder extends cardTools.litElement() {

    constructor() {
      super();
      this.EL_STYLES = ["left", "top", "right", "bottom", "position"];
    }

    static get properties() {
      return {
        card: {},
      };
    }

    async setConfig(config) {
      cardTools.checkVersion(0.3);

      if(!config || !config.card) {
        throw new Error("Card config incorrect");
      }
      if(Array.isArray(config.card)) {
        throw new Error("It says 'card', not 'cardS'. Remove the dash.");
      }

      this.templated = [];
      this.attempts = 5;

      if (config.entities)
        config.card.entities = config.entities;

      this.card = (config.thing && config.thing === 'card')
        ? cardTools.createCard(config.card)
        : cardTools.createElement(config.card);

      if(this._hass)
        this.card.hass = this._hass;

      if(this._config)
        this._cardMod();

      this._config = config;
    }

    createRenderRoot() {
      return this;
    }
    render() {
      return cardTools.litHtml()`
    <div id="root">${this.card}</div>
    `;
    }

    async firstUpdated() {
      this._cardMod();
    }

    async _cardMod() {
      let root = this.card;
      let targets = null;
      let styles = null;
      if(this.classList.contains("element")) {
        // target = this.card;
        root = this;
      }
      while(!targets) {
        await root.updateComplete;
        if(root.querySelector("style"))
          styles = root.querySelector("style");
        if(root.querySelector("state-badge")) {
          targets = root.querySelectorAll("state-badge");
          continue;
        }
        if(root.card) {
          root = root.card;
          continue;
        }
        if(root.shadowRoot) {
          root = root.shadowRoot;
          continue;
        }
        if(root.querySelector("#root")) {
          root = root.querySelector("#root");
          continue;
        }
        if(root.firstElementChild) {
          root = root.firstElementChild;
          continue;
        }
        break;
      }

      if(!targets && this.attempts) // Try again
        setTimeout(() => this._cardMod(), 100);
      this.attempts--;
      targets = targets || [].concat(this.card);

      targets.forEach((target) => {
        let state_badge_styles = target.shadowRoot.querySelector("style");

        if (this._config.state_badge_css) {
          const link = document.createElement('link');
          link.setAttribute('rel', 'stylesheet');
          link.setAttribute('href', this._config.state_badge_css);
          if (!target.shadowRoot.innerHTML.includes(this._config.state_badge_css)) {
            target.shadowRoot.appendChild(link);
          }
        }

        if (this._config.state_badge_styles) {
          if (!state_badge_styles) {
            state_badge_styles = document.createElement('style');
            root.appendChild(state_badge_styles);
          }
          if (!state_badge_styles.innerHTML.includes(this._config.state_badge_styles)) {
            state_badge_styles.innerHTML += this._config.state_badge_styles;
          }
        }

        if(this._config.style) {
          for(var k in this._config.style) {
            if(cardTools.hasTemplate(this._config.style[k]))
              this.templated.push(k);
            if(this.card.style.setProperty)
              this.card.style.setProperty(k, '');
            if(target.style.setProperty) {
              target.style.setProperty(k, cardTools.parseTemplate(this._config.style[k]));
            }
            if(this.classList.contains("element") && this.EL_STYLES.indexOf(k) > -1) {
              this.style.setProperty(k, cardTools.parseTemplate(this._config.style[k]));
            }
          }
        }
      });
      this.targets = targets;
    }

    set hass(hass) {
      this._hass = hass;
      if(this.card) this.card.hass = hass;
      if(this.templated)
        this.templated.forEach((k) => {
          this.targets.forEach((target) => {
            target.style.setProperty(k, cardTools.parseTemplate(this._config.style[k], ''));
            if(this.classList.contains("element") && this.EL_STYLES.indexOf(k) > -1) {
              this.style.setProperty(k, cardTools.parseTemplate(this._config.style[k]));
            }
          });
        });
    }

    getCardSize() {
      if(this.card)
        return typeof this.card.getCardSize === "function" ? this.card.getCardSize() : 1;
      return 1;
    }
  }

  customElements.define('state-badge-modder', StateBadgeModder);
});

window.setTimeout(() => {
  if(customElements.get('card-tools')) return;
  customElements.define('state-badge-modder', class extends HTMLElement{
    setConfig() { throw new Error("Can't find card-tools. See https://github.com/thomasloven/lovelace-card-tools");}
  });
}, 2000);
