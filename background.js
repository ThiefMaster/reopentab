'use strict';

async function reopenTab() {
  const windowId = (await browser.windows.getCurrent())?.id;
  const recentlyClosed = await browser.sessions.getRecentlyClosed();
  const lastClosedInWindow = recentlyClosed.find(x => x.tab?.windowId === windowId);
  if (!lastClosedInWindow) {
    return;
  }
  const tab = lastClosedInWindow.tab;
  await browser.sessions.restore(tab.sessionId);
}

browser.commands.onCommand.addListener(command => {
  if (command === 'reopen-tab') {
    reopenTab();
  }
});
