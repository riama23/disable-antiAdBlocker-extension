import Tab = chrome.tabs.Tab;

const deleteAntiBlocker = (tab: Tab): void => {
    const domains: Domain[] = [
        {
            domain: 'www.lavanguardia.com',
            fc: (doc: Document) => {
                doc.querySelector('.modal.show.fade.ev.ev-open-modal-paywall-ADB_DETECTION.in')?.remove();
            }
        },
        {
            domain: 'computerhoy.com',
            fc: (doc: Document) => {
                doc.querySelectorAll('.tp-modal, .tp-backdrop.tp-active').forEach(item => item.remove());
                doc.querySelector('.tp-modal-open')?.classList.remove('tp-modal-open')
            }
        },
        {
            domain: 'elpais.com',
            fc: (doc: Document) => {
                doc.querySelectorAll('.fc-ab-root').forEach(item => item.remove());
                doc.body.style.overflow = 'auto';
            }
        }
    ];
    const {hostname} = new URL(tab.url as string);
    const domainExist = domains.find(dom => dom.domain === hostname);

    if (!domainExist) {
        return;
    }

    domainExist.fc(document);
}

chrome.action.onClicked.addListener((tab) => {

    chrome.scripting.executeScript({
        target: {tabId: tab.id ? tab.id : -1},
        func: deleteAntiBlocker,
        args: [tab]
    })
        .then();

});