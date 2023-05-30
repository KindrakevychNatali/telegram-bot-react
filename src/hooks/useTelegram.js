import { useEffect } from 'react';

export function useTelegram() {
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    const onClose = () => {
      tg.close();
    };

    const onToggleButton = () => {
      if (tg.WebAppButton.isVisible) {
        tg.WebAppButton.hide();
      } else {
        tg.WebAppButton.show();
      }
    };

    tg.onClose = onClose;
    tg.onWebAppButtonClicked = onToggleButton;

    return () => {
      tg.onClose = null;
      tg.onWebAppButtonClicked = null;
    };
  }, [tg]);

  return {
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
  };
}
