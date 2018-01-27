import * as React from 'react';

interface Props {
}

const loadScripts = (function () {
  let loaded = false;
  return function () {
    if (loaded && (window as any).DISQUS) {
      (window as any).DISQUS.reset();
    }
    loaded = true;
    const d = document, s = d.createElement('script');
    s.src = 'https://ethersquares.disqus.com/embed.js';
    s.setAttribute('data-timestamp', '' + (new Date()).getTime());
    (d.head || d.body).appendChild(s);
  };
})();

export default class DisqusThread extends React.Component<Props> {
  componentDidMount() {
    (window as any).disqus_config = function () {
      this.page.url = 'https://ethersquares.io';
      this.page.identifier = 'general';
    };

    loadScripts();
  }

  render() {
    return <div id="disqus_thread"/>;
  }
}
