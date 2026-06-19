"use client";
import React, { useEffect, useState } from "react";
import styles from "./currency.module.css";

const RATE_CURRENCIES = [
  { code: "USD", label: "US Dollar",         flag: "🇺🇸" },
  { code: "EUR", label: "Euro",              flag: "🇪🇺" },
  { code: "GBP", label: "British Pound",     flag: "🇬🇧" },
  { code: "AUD", label: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", label: "Canadian Dollar",   flag: "🇨🇦" },
  { code: "SGD", label: "Singapore Dollar",  flag: "🇸🇬" },
  { code: "INR", label: "Indian Rupee",      flag: "🇮🇳" },
  { code: "JPY", label: "Japanese Yen",      flag: "🇯🇵" },
  { code: "CHF", label: "Swiss Franc",       flag: "🇨🇭" },
  { code: "CNY", label: "Chinese Yuan",      flag: "🇨🇳" },
];

const DOS = [
  { icon: "fa-solid fa-circle-check", text: "Exchange money only at licensed banks or authorized money changers" },
  { icon: "fa-solid fa-circle-check", text: "Carry both cards and local cash (LKR) at all times" },
  { icon: "fa-solid fa-circle-check", text: "Keep all ATM and exchange receipts until you leave the island" },
  { icon: "fa-solid fa-circle-check", text: "Choose LKR when a card terminal asks to charge in your home currency" },
  { icon: "fa-solid fa-circle-check", text: "Notify your bank before travel to prevent international transaction blocks" },
  { icon: "fa-solid fa-circle-check", text: "Use ATMs attached to major bank branches for the safest withdrawals" },
  { icon: "fa-solid fa-circle-check", text: "Carry small notes for tuk-tuks, local markets, and rural areas" },
  { icon: "fa-solid fa-circle-check", text: "Have a backup payment card in case your primary card is blocked or lost" },
];

const DONTS = [
  { icon: "fa-solid fa-circle-xmark", text: "Never exchange currency with street dealers or unofficial sources" },
  { icon: "fa-solid fa-circle-xmark", text: "Don't rely entirely on cards — outages occur outside major cities" },
  { icon: "fa-solid fa-circle-xmark", text: "Don't arrive without any local cash — you'll need it immediately for transport" },
  { icon: "fa-solid fa-circle-xmark", text: "Don't carry excessive cash — use cards wherever they are accepted" },
  { icon: "fa-solid fa-circle-xmark", text: "Don't discard exchange receipts — hotels may require proof of legal exchange" },
  { icon: "fa-solid fa-circle-xmark", text: "Don't exchange large sums at the airport — rates are less competitive" },
  { icon: "fa-solid fa-circle-xmark", text: "Don't assume Apple Pay or Google Pay will work — physical cards are essential" },
  { icon: "fa-solid fa-circle-xmark", text: "Don't use isolated ATMs at night — use secure, bank-branch ATMs only" },
];

const QUICK_FACTS = [
  { icon: "fa-solid fa-coins",            label: "Official Currency",  value: "Sri Lankan Rupee (LKR)" },
  { icon: "fa-solid fa-credit-card",      label: "Cards Accepted",     value: "Visa & Mastercard" },
  { icon: "fa-solid fa-building-columns", label: "Best Exchange",      value: "Licensed Banks" },
  { icon: "fa-solid fa-money-bill-wave",  label: "ATM Withdrawals",    value: "Rupees Only" },
  { icon: "fa-solid fa-receipt",          label: "Keep Receipts",      value: "Required for Re-conversion" },
  { icon: "fa-solid fa-wallet",           label: "Recommended Split",  value: "60–80% Card · 20–40% Cash" },
];

const CARDS_OK    = ["Hotels & Resorts", "Tour Operators", "Shopping Malls", "Supermarkets", "Mid-range Restaurants", "Fuel Stations"];
const CASH_NEEDED = ["Tuk-Tuks", "Street Food & Markets", "Small Guesthouses", "Local Cafés", "Rural Villages", "Entrance Tickets"];

// ── Fetch rates: tries open.er-api first, falls back to fawazahmed0 ──────────
async function fetchRates() {
  // Attempt 1: open.er-api (returns { rates: { LKR, EUR, ... }, date })
  try {
    const r = await fetch("https://open.er-api.com/v6/latest/USD", { cache: "no-store" });
    if (r.ok) {
      const d = await r.json();
      if (d?.result === "success" && d?.rates?.LKR) {
        const lkrPerUsd = d.rates.LKR;
        // build a map: code → LKR per 1 unit
        const map = {};
        RATE_CURRENCIES.forEach(({ code }) => {
          if (d.rates[code]) map[code] = lkrPerUsd / d.rates[code];
        });
        return { rates: map, date: d.time_last_update_utc?.slice(0, 16) ?? d.time_last_update_utc };
      }
    }
  } catch (_) { /* fall through */ }

  // Attempt 2: fawazahmed0 CDN (returns { date, usd: { lkr, eur, ... } })
  try {
    const r = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json", { cache: "no-store" });
    if (r.ok) {
      const d = await r.json();
      if (d?.usd?.lkr) {
        const lkrPerUsd = d.usd.lkr;
        const map = {};
        RATE_CURRENCIES.forEach(({ code }) => {
          const lower = code.toLowerCase();
          if (d.usd[lower]) map[code] = lkrPerUsd / d.usd[lower];
        });
        return { rates: map, date: d.date };
      }
    }
  } catch (_) { /* fall through */ }

  // Attempt 3: fawazahmed0 Cloudflare Pages mirror
  try {
    const r = await fetch("https://currency-api.pages.dev/v1/currencies/usd.json", { cache: "no-store" });
    if (r.ok) {
      const d = await r.json();
      if (d?.usd?.lkr) {
        const lkrPerUsd = d.usd.lkr;
        const map = {};
        RATE_CURRENCIES.forEach(({ code }) => {
          const lower = code.toLowerCase();
          if (d.usd[lower]) map[code] = lkrPerUsd / d.usd[lower];
        });
        return { rates: map, date: d.date };
      }
    }
  } catch (_) { /* fall through */ }

  throw new Error("All rate sources failed");
}

export default function Currency() {
  const [rates, setRates]       = useState(null);
  const [ratesError, setRatesError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchRates()
      .then(({ rates, date }) => { setRates(rates); setLastUpdated(date); })
      .catch(() => setRatesError(true));
  }, []);

  const formatLKR = (val) =>
    Number(val).toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={styles.section_wrapper}>


      <p className={styles.section_description}>
        Sri Lanka's official currency is the <strong>Sri Lankan Rupee (LKR)</strong>. Foreign currencies such as USD, EUR, and GBP are not accepted for everyday purchases — you will need local rupees for most transactions. The safest approach is to carry a combination of cards and cash, exchange money only at licensed banks or authorized money changers, and always keep your receipts. Here is everything you need to know about handling money as a visitor to Sri Lanka.
      </p>

      {/* ── Quick facts ── */}
      <div className={styles.quick_facts}>
        {QUICK_FACTS.map((f) => (
          <div key={f.label} className={styles.fact_card}>
            <i className={`${f.icon} ${styles.fact_icon}`}></i>
            <span className={styles.fact_label}>{f.label}</span>
            <span className={styles.fact_value}>{f.value}</span>
          </div>
        ))}
      </div>

      {/* ── Live rates + card/cash ── */}
      <div className={styles.middle_row}>

        <div className={styles.rates_block}>
          <div className={styles.rates_header}>
            <h3 className={styles.block_heading}>LIVE EXCHANGE RATES <span>→ LKR</span></h3>
            {lastUpdated && <span className={styles.rates_updated}>Updated {lastUpdated}</span>}
          </div>
          <p className={styles.rates_sub}>How much 1 unit of each currency buys in Sri Lankan Rupees today.</p>

          {!rates && !ratesError && (
            <p className={styles.rates_loading}>
              <i className="fa-solid fa-spinner fa-spin"></i> Fetching live rates…
            </p>
          )}

          {ratesError && (
            <p className={styles.rates_error}>
              <i className="fa-solid fa-triangle-exclamation"></i> Live rates unavailable — please check a currency converter before travel.
            </p>
          )}

          {rates && (
            <div className={styles.rates_table}>
              {RATE_CURRENCIES.map((c) => {
                const val = rates[c.code];
                return (
                  <div key={c.code} className={styles.rate_row}>
                    <div className={styles.rate_currency}>
                      <span className={styles.rate_flag}>{c.flag}</span>
                      <div className={styles.rate_names}>
                        <span className={styles.rate_code}>{c.code}</span>
                        <span className={styles.rate_label}>{c.label}</span>
                      </div>
                    </div>
                    <div className={styles.rate_value_wrap}>
                      <span className={styles.rate_equals}>1 {c.code} =</span>
                      <span className={styles.rate_value}>
                        {val ? `LKR ${formatLKR(val)}` : "—"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* cards / cash panels */}
        <div className={styles.payment_blocks}>
          <div className={styles.payment_block}>
            <h3 className={styles.block_heading}><i className="fa-solid fa-credit-card"></i> CARDS ACCEPTED</h3>
            <ul className={styles.payment_list}>
              {CARDS_OK.map((item) => (
                <li key={item} className={styles.payment_item_ok}>
                  <i className="fa-solid fa-check"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.payment_block}>
            <h3 className={styles.block_heading}><i className="fa-solid fa-money-bill"></i> CASH NEEDED</h3>
            <ul className={styles.payment_list}>
              {CASH_NEEDED.map((item) => (
                <li key={item} className={styles.payment_item_cash}>
                  <i className="fa-solid fa-coins"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* ── Do's and Don'ts ── */}
      <div className={styles.dos_donts}>
        <div className={styles.dos_col}>
          <h3 className={styles.dos_heading}><i className="fa-solid fa-thumbs-up"></i> DO</h3>
          <ul className={styles.dos_list}>
            {DOS.map((d, i) => (
              <li key={i} className={styles.do_item}>
                <i className={`${d.icon} ${styles.do_icon}`}></i>
                <span>{d.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.donts_col}>
          <h3 className={styles.donts_heading}><i className="fa-solid fa-thumbs-down"></i> DON'T</h3>
          <ul className={styles.donts_list}>
            {DONTS.map((d, i) => (
              <li key={i} className={styles.dont_item}>
                <i className={`${d.icon} ${styles.dont_icon}`}></i>
                <span>{d.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
