import { useLocation } from '@umijs/max';
import { useEffect, useState } from 'react';

const ZENDESK_SCRIPT_TAG_ID = 'ze-snippet';
const ZENDESK_SNIPPET_KEY = '0c1ede9e-6403-41b0-86ed-5d3ccf644618';
const ZENDESK_SNIPPET_URL = `https://static.zdassets.com/ekr/snippet.js?key=${ZENDESK_SNIPPET_KEY}`;

const ROUTES_TO_HIDE_CHAT = ['/user']; // "/user" include all login, register, recovery ... routes

function shouldHideChat(locationPathname: string) {
  return ROUTES_TO_HIDE_CHAT.some((route) => locationPathname.includes(route));
}

const ZendeskChat: React.FC<Record<string, never>> = () => {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  let location = useLocation();

  /**
   * Append script tag as last element in body tag if this script tag doesn't exist yet
   */
  const loadZendeskScript = () => {
    const iframeScript = document.getElementById(ZENDESK_SCRIPT_TAG_ID);
    if (iframeScript) return;

    let script = document.createElement('script');
    script.src = ZENDESK_SNIPPET_URL;
    script.setAttribute('id', ZENDESK_SCRIPT_TAG_ID);
    script.type = 'text/javascript';
    script.addEventListener('load', () => setScriptLoaded(true));

    document.body.append(script);
  };

  /**
   * Load zendesk script when user is not in a page that should hides it and the scripted was not loaded yet
   */
  useEffect(() => {
    if (!shouldHideChat(location.pathname) || !scriptLoaded) {
      loadZendeskScript();
    }
  }, [scriptLoaded, location.pathname]);

  /**
   * When user navigate through pages hide chat if should be hidden otherwise show
   */
  useEffect(() => {
    // @ts-ignore
    if (!window.zE) return;
    // @ts-ignore
    window.zE('messenger', shouldHideChat(location.pathname) ? 'hide' : 'show');
  }, [location.pathname]);

  /**
   * When the zendesk script is already loaded and this component is unmonted hide the chat
   */
  useEffect(() => {
    return () => {
      // @ts-ignore
      if (!window.zE) return;
      // @ts-ignore
      window.zE('messenger', 'hide');
    };
  }, []);

  return null;
};

export default ZendeskChat;
