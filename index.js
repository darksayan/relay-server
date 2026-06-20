/*
 * © 2026 SeXyxeon (VOIDSEC)
 *
 * ⚠️ COPYRIGHT NOTICE
 * This source code is protected under copyright law.
 * Any form of re-uploading, recoding, modification,
 * selling, or redistribution WITHOUT explicit permission
 * from the original author is strictly prohibited.
 *
 * ❌ NO CREDIT = NO PERMISSION
 * ❌ DO NOT CLAIM THIS CODE AS YOUR OWN
 *
 * ✔️ Usage or modification is allowed ONLY
 * with prior permission and proper credit.
 *
 * OFFICIAL LINKS (ONLY):
 * YouTube   : https://youtube.com/@voidsec7718
 * Instagram : sabir._7718
 * Telegram  : https://t.me/SABIR7718
 * GitHub    : https://github.com/SABIR7718
 * WhatsApp  : +91 73650 85213
 *
 * Violations may result in DMCA takedown
 * or termination of the Telegram bot.
 */

const SABIR7718_E = require('express');
const S7_H = require('http');
const SYHaTE_WS = require('ws');
const { log } = require('@sabir7718/log');

const S7HaTe_A = SABIR7718_E();
const SYHaTeS7_S = S7_H.createServer(S7HaTe_A);
const SABIR7718_WSS = new SYHaTE_WS.Server({ server: SYHaTeS7_S });

let S7_MS = null;
const S7HaTe_WM = new Map();

SABIR7718_WSS.on('connection', (SYHaTE_W) => {
    log('info', 'RelayServer', 'Connection established');
    
    SYHaTE_W.on('message', (SYHaTeS7_M) => {
        try {
            const SABIR7718_D = JSON.parse(SYHaTeS7_M);
            
            if (SABIR7718_D.role === 'MASTER') {
                S7_MS = SYHaTE_W;
                if (SABIR7718_D.target) {
                    const S7_TW = S7HaTe_WM.get(SABIR7718_D.target);
                    if (S7_TW) S7_TW.send(JSON.stringify(SABIR7718_D.payload));
                } else if (SABIR7718_D.payload) {
                    for (const [S7HaTe_K, SYHaTE_V] of S7HaTe_WM.entries()) {
                        SYHaTE_V.send(JSON.stringify(SABIR7718_D.payload));
                    }
                }
            } else if (SABIR7718_D.role === 'WORKER') {
                const SYHaTeS7_ID = SABIR7718_D.id;
                if (!S7HaTe_WM.has(SYHaTeS7_ID)) {
                    S7HaTe_WM.set(SYHaTeS7_ID, SYHaTE_W);
                    log('success', 'RelayServer', 'Registered ' + SYHaTeS7_ID);
                }
                if (S7_MS && SABIR7718_D.payload) {
                    SABIR7718_D.payload.workerId = SYHaTeS7_ID;
                    S7_MS.send(JSON.stringify(SABIR7718_D.payload));
                }
            }
        } catch (S7_E) {
            log('error', 'RelayServer', 'Message: ' + S7_E.message);
        }
    });

    SYHaTE_W.on('close', () => {
        if (SYHaTE_W === S7_MS) {
            S7_MS = null;
            log('warn', 'RelayServer', 'Master disconnected');
        } else {
            for (const [S7HaTe_K, SYHaTE_V] of S7HaTe_WM.entries()) {
                if (SYHaTE_V === SYHaTE_W) {
                    S7HaTe_WM.delete(S7HaTe_K);
                    log('warn', 'RelayServer', 'Worker disconnected');
                    break;
                }
            }
        }
    });
});

S7HaTe_A.get('/', (SYHaTeS7_RQ, SABIR7718_RS) => SABIR7718_RS.status(200).json({ status: 'active' }));
SYHaTeS7_S.listen(process.env.PORT || 3000);

if (process.env.URL) {

    (async () => {
        try {
            const res = await fetch(process.env.URL);
            log('info', 'PING', `Pinged: ${process.env.URL} | Status: ${res.status}`);
        } catch (err) {
            log('error', 'PING', err.message);
        }
    })();

    setInterval(async () => {
        try {
            const res = await fetch(process.env.URL);
            log('info', 'PING', `Pinged: ${process.env.URL} | Status: ${res.status}`);
        } catch (err) {
            log('error', 'PING', err.message);
        }
    }, 5 * 60 * 1000);
}