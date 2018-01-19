import * as React from 'react';

interface Props {
}

const PASTE: string = `
<div id="disqus_thread"></div>
<script>
var disqus_config = function () {
  this.page.url = 'https://ethersquares.io';
  this.page.identifier = 'general';
};

(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = 'https://ethersquares.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
<noscript>
Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
</noscript>                            
`;

export default class DisqusPage extends React.Component<Props> {
  render() {
    return <div dangerouslySetInnerHTML={{ __html: PASTE }}/>;
  }
}
