customElements.whenDefined('card-tools').then(() => {
  var cardTools = customElements.get('card-tools');

  class StateBadgeModder2 extends cardTools.LitElement {

    setConfig(config) {
      if (config.extra_css) this.extra_css = config.extra_css;
      if (config.state_badge_css) this.state_badge_css = config.state_badge_css;

      this.cardConfig = config.card;
      const card = cardTools.createElement(this.cardConfig);
      cardTools.provideHass(card);
      this.card = card;

      this.cardMod();
    }

    async cardMod() {
      let root = this.card;
      let badge = null;

      while (!badge) {
        await root.updateComplete;
        if (root.querySelector("style"))
          styles = root.querySelector("style");
        if (root.querySelector("state-badge")) {
          badge = root.querySelector("state-badge");
          continue;
        }
        if (root.card) {
          root = root.card;
          continue;
        }
        if (root.shadowRoot) {
          root = root.shadowRoot;
          continue;
        }
        if (root.querySelector("#root")) {
          root = root.querySelector("#root");
          continue;
        }
        if (root.firstElementChild) {
          root = root.firstElementChild;
          continue;
        }
        break;
      }

      if (this.extra_css) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', this.extra_css);
        if (!badge.shadowRoot.innerHTML.includes(this.extra_css)) {
          badge.shadowRoot.appendChild(link);
        }
      }

      if (this.state_badge_css) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', this.state_badge_css);
        if (!badge.shadowRoot.innerHTML.includes(this.state_badge_css)) {
          badge.shadowRoot.appendChild(link);
        }
      }
    }

    render() {
      return cardTools.LitHtml`
      <div id="root">${this.card}</div>
      `;
    }
  }

  customElements.define("state-badge-modder", StateBadgeModder2);
}); // END OF .then(() => {

setTimeout(() => {
  if (customElements.get('card-tools')) return;
  customElements.define('state-badge-modder', class extends HTMLElement {
    setConfig() { throw new Error("Can't find card-tools. See https://github.com/thomasloven/lovelace-card-tools"); }
  });
}, 2000);
