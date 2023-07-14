import { useEffect } from "react";

export default function useSharedLogic(props) {
  const { appId = "your-app-id" } = props;

  useEffect(() => {
    initFacebookService();
  }, []);

  function getFacebookInstance() {
    FB.init({ appId: appId, xfbml: true, version: "v5.0" });
  }

  function initFacebookService() {
    if (typeof FB != "undefined") {
      getFacebookInstance();
    } else {
      //@ts-ignore
      window.fbAsyncInit = function () {
        getFacebookInstance();
      };

      (function (d, s, id) {
        var js;
        var fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) return;

        js = d.createElement(s);
        js.id = id;
        js.src =
          "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0";

        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  }

  return {};
}
