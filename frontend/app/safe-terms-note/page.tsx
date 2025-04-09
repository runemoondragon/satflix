'use client';

import React, { useState } from 'react';
import { FileText, Shield, Key, Copy, CheckCheck } from 'lucide-react';

export default function SafeTermsNote() {
  const [copied, setCopied] = useState(false);

  const getDocumentContent = () => {
    return `VOOOMO: SIMPLE AGREEMENT FOR FUTURE EQUITY (SAFE) + TOKEN WARRANT

Project: Vooomo
Issuer: Vooomo (to be incorporated)
1. Purpose
This SAFE represents a convertible, non-debt contribution by the Contributor to support the development of Vooomo, a Bitcoin-native media platform. In addition to equity rights, the Contributor is granted a Token Warrant, entitling them to receive a proportional share of the native Vooomo token upon issuance.

2. Contribution
The Contributor provides BTC (Bitcoin) to support the development and operation of the Vooomo platform.

BTC Receiving Address / LN Invoice ID:
Transaction hash or LN proof will be recorded for all contributon.
3. Tiered Tranche Terms
This agreement is part of a publicly-disclosed, tiered fundraising structure implemented by the Vooomo project. The total target raise for this round is $500,000 to $1,000,000 USD equivalent in BTC, representing up to 10% equity in the future incorporated entity.

Tier 1 – Early Backers
Contribution Amount: $1,000 USD (BTC equivalent)
SAFE Equity Rights: Full SAFE (1.0x equity)
Token Rights: Full token allocation
Valuation Cap: $5,000,000
Total Units Available: 500
Tier 2 – Booster Round
Contribution Amount: $500 USD (BTC equivalent)
SAFE Equity Rights: Half SAFE (0.5x equity)
Token Rights: Half token allocation
Valuation Cap: $7,500,000
Total Units Available: TBD
Tier 3 – Final Tier
Contribution Amount: $250 USD (BTC equivalent)
SAFE Equity Rights: Quarter SAFE (0.25x equity)
Token Rights: Quarter token allocation
Valuation Cap: $10,000,000
Total Units Available: TBD
Each funding tranche includes a limited number of digital inscriptions minted via Bitcoin (Ordinals protocol), each representing a specific contribution tier and corresponding investor rights. Each inscription is immutable and tied to the public wallet address that holds it. If the funding goal is reached before subsequent tranches are activated, no further inscriptions will be minted.

The rights associated with each tier are explicitly defined at the time of inscription and encoded in both metadata and the Contributor Ledger.

4. Binding Terms Per Tier
The SAFE and Token Warrant rights granted in this agreement are explicitly determined by the Tier at which the contribution was made, and shall not be retroactively adjusted.

The Vooomo project reserves the right to:

Close fundraising upon reaching target
Adjust future tranche terms before minting
Publicly publish all ledger entries, including wallet IDs and inscription IDs
📘 Example Scenario (Including Token Calculations)
A Tier 1 contributor inscribes a $1,000 contribution under a $5M valuation cap. Upon incorporation, this entitles them to:

An equity share reflecting the $5M cap
A token allocation of 20,000 $VOO, based on the calculation: [(1,000 × 100,000,000) / 5,000,000 = 20,000 Tokens]
If a contributor joins later under Tier 2, with a $500 contribution at a $7.5M cap, they receive:

Reduced equity rights (0.5x SAFE)
A token allocation of 6,666 $VOO, calculated as: [(500 × 100,000,000) / 7,500,000 = 6,666 Tokens]
And for Tier 3, a $250 contribution at a $10M cap results in:

Quarter SAFE equity rights
A token allocation of 2,500 $VOO, calculated as: [(250 × 100,000,000) / 10,000,000 = 2,500 Tokens]
This structure incentivizes early participation and rewards contributors who commit capital during the most formative phase of the project.

5. No Guarantees
The Contributor understands and agrees:

This is a high-risk, experimental project
The token has not yet been issued
There is no guarantee of profits, returns, or resale value
This SAFE is not a public offering and may be classified as a security depending on jurisdiction
6. Rights of the Contributor
Until conversion:

No voting rights
No claim to assets
No right to demand a refund
Upon conversion:

Contributor becomes a shareholder and token holder with pro-rata rights
7. Future Governance
Contributor agrees to participate in future governance mechanisms (e.g. Bitboard.me) according to the open-source ruleset governing the Vooomo ecosystem.

8. Legal Jurisdiction
Governing Law: [to be determined at incorporation, e.g. Delaware, Wyoming]
In absence of legal incorporation, all disputes will be resolved via public forum (e.g. GitHub, online arbitration).
Signatures
VOOOMO
Wallet ID: bc1p2q6qtpam8tsrsfkuumh7wduxl2j83rzf6l2u9wl09hw90thapxrqelakf2
Signature (Public Key):
ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAQEAmKNDuI8DPFz1lsRUpL2Pc7jJG+IvUmMgaAD7pX9dcugvfOwixknPm+JItveZFGMe8kOk5jcuf4x49wRqqepIBNZuYp+zOmchB4RiOnWYrMn0WUKqWuWBld36zZ0sBHx/HtXXByxWxUaxjpiXWmjSOOMA/+8vS8X29ncc6+YlQ+IsEqZCzMYfbcBWsb5NgQJirh1SJ3M88lIKFwHVWyrrifptC55fnS2lfdY6k3mN8fEsBxp8bx17YNtu8e92LO6axv1IQ8g/RZnFuiUkU7mkSgmbLplC7F9Cj6GmaSxw6e+sF/6TxtzKDHhUZ49qBm8WevMuDB4BKVJTrza+tHfCsw== rsa-key-20210729

Date: April 9, 2025

end.`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getDocumentContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-800">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            VOOOMO: SIMPLE AGREEMENT FOR FUTURE EQUITY (SAFE) + TOKEN WARRANT
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div>Project: Vooomo</div>
            <div>Issuer: Vooomo (to be incorporated)</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Purpose */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Purpose</h2>
            <p className="text-gray-300 leading-relaxed">
              This SAFE represents a convertible, non-debt contribution by the Contributor to support the development of Vooomo, a Bitcoin-native media platform. In addition to equity rights, the Contributor is granted a Token Warrant, entitling them to receive a proportional share of the native token ($VOO) upon issuance.
            </p>
          </section>

          {/* Contribution */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Contribution</h2>
            <p className="text-gray-300 leading-relaxed">
              The Contributor provides BTC (Bitcoin) to support the development and operation of the Vooomo platform.
            </p>
            <div className="mt-4 p-4 bg-gray-900 rounded-lg">
              <p className="text-gray-300">BTC Receiving Address / LN Invoice ID</p>
              <p className="text-gray-400 text-sm mt-2">Transaction hash or LN proof will be recorded for all contributon.</p>
            </div>
          </section>

          {/* Tiered Tranche Terms */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Tiered Tranche Terms</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              This agreement is part of a publicly-disclosed, tiered fundraising structure implemented by the Vooomo project. The total target raise for this round is $500,000 to $1,000,000 USD equivalent in BTC, representing up to 10% equity in the future incorporated entity.
            </p>

            {/* Tiers */}
            <div className="space-y-6">
              {/* Tier 1 */}
              <div className="p-4 bg-gray-900 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">Tier 1 – Early Backers</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Contribution Amount: $1,000 USD (BTC equivalent)</li>
                  <li>SAFE Equity Rights: Full SAFE (1.0x equity)</li>
                  <li>Token Rights: Full token allocation</li>
                  <li>Valuation Cap: $5,000,000</li>
                  <li>Total Units Available: 500</li>
                </ul>
              </div>

              {/* Tier 2 */}
              <div className="p-4 bg-gray-900 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">Tier 2 – Booster Round</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Contribution Amount: $500 USD (BTC equivalent)</li>
                  <li>SAFE Equity Rights: Half SAFE (0.5x equity)</li>
                  <li>Token Rights: Half token allocation</li>
                  <li>Valuation Cap: $7,500,000</li>
                  <li>Total Units Available: TBD</li>
                </ul>
              </div>

              {/* Tier 3 */}
              <div className="p-4 bg-gray-900 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">Tier 3 – Final Tier</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Contribution Amount: $250 USD (BTC equivalent)</li>
                  <li>SAFE Equity Rights: Quarter SAFE (0.25x equity)</li>
                  <li>Token Rights: Quarter token allocation</li>
                  <li>Valuation Cap: $10,000,000</li>
                  <li>Total Units Available: TBD</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Example Scenario */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              <FileText className="inline-block w-5 h-5 mr-2" />
              Example Scenario (Including Token Calculations)
            </h2>
            <div className="bg-gray-900 p-4 rounded-lg space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">Tier 1 Example:</h3>
                <p className="text-gray-300">A Tier 1 contributor made a $1,000 contribution under a $5M valuation cap. Upon incorporation, this entitles them to:</p>
                <ul className="list-disc list-inside mt-2 text-gray-300 ml-4">
                  <li>An equity share reflecting the $5M cap</li>
                  <li>A token allocation of 20,000 vooomo token, based on the calculation: [(1,000 × 100,000,000) / 5,000,000 = 20,000 Tokens]</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Copy Button */}
          <div className="my-8">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy Document
                </>
              )}
            </button>
          </div>

          {/* Document Verification */}
          <section className="mt-12 p-6 bg-gray-900 rounded-lg">
            <h2 className="flex items-center text-xl font-semibold text-white mb-4">
              <Key className="w-5 h-5 mr-2" />
              Document Verification Note
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>To verify the authenticity of this document:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li className="flex items-center gap-2">
                  <span>Copy VOOOMO: SIMPLE AGREEMENT FOR FUTURE EQUITY (SAFE) using copy button or </span>
                  <a
                    href="https://github.com/runemoondragon/satflix/blob/main/frontend/vooomo_safe_token_warrant.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-400 transition-colors"
                    title="View on GitHub"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <span>Paste it into the </span>
                  <a 
                    href="https://andersbrownworth.com/blockchain/hash" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-400 underline inline-flex items-center gap-1"
                  >
                    SHA-256 Tool
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
                <li>Confirm the resulting hash matches the official SHA-256 fingerprint below:</li>
              </ol>
              <div className="mt-4 p-4 bg-gray-800 rounded font-mono text-sm break-all">
                SHA-256 Hash of this Document: 64e29d587995d4b2123603d8b8ef10376dbd925e9e2c1e7b9c8660186435f512
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 
