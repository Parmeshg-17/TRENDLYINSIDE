import { motion } from 'framer-motion';
import { useSEO } from '../lib/seo';

export function PrivacyPage() {
  useSEO({
    title: 'Privacy Policy & Data Security | TrendlyInside',
    description: 'Learn how TrendlyInside protects creator privacy with our no-login, no-subscription approach, anonymous analytics, and zero-tracking policy.',
    path: '/privacy',
  });

  return (
    <>
      <div className="pt-28 md:pt-32 pb-14 border-b border-glacial-sky/20" style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-primary mb-3 inline-flex text-xs">Transparent &amp; No-Login</span>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-midnight-abyss mb-2">Privacy Policy</h1>
            <p className="text-frosty-slate text-sm">Last updated: October 2026</p>
          </motion.div>
        </div>
      </div>
      <div className="container-main py-10">
        <div className="max-w-3xl mx-auto card p-8 prose prose-sm text-midnight-abyss space-y-6">
          <div>
            <h2 className="font-heading font-bold text-xl mb-2 text-midnight-abyss">1. Zero-Account Product Philosophy</h2>
            <p className="text-frosty-slate text-sm leading-relaxed">
              TrendlyInside is intentionally built as a free, friction-free tool. We do <strong>not</strong> require user accounts, passwords, social logins (Google, Apple), credit card details, or subscription billing. You can analyze videos and generate ideas immediately without creating a profile.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl mb-2 text-midnight-abyss">2. Information Collected via Forms &amp; Tools</h2>
            <p className="text-frosty-slate text-sm leading-relaxed mb-3">
              We collect information only when explicitly submitted through our interactive tools:
            </p>
            <ul className="space-y-2 text-frosty-slate text-sm list-disc pl-5">
              <li><strong>Contact Form:</strong> When you submit a question or issue on our <a href="/contact" className="text-fjord-blue underline">Contact page</a>, we collect your name, email address, topic, and message to respond to your request. Forms use a hidden honeypot field (<code>_gotcha</code>) to trap automated spam without requiring intrusive captchas.</li>
              <li><strong>Analyzer Tools:</strong> When you enter a public YouTube video, Short, or channel link, we retrieve publicly available metadata (video title, duration, thumbnail, and public transcript) to generate content coaching scores. We do not inspect private or unlisted videos.</li>
              <li><strong>Generator Tools:</strong> Topics, niches, creator stages, and goals provided in the Hook, Idea, and Roadmap generators are processed on the server to formulate recommendations and cached temporarily to prevent redundant processing.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl mb-2 text-midnight-abyss">3. Cookies &amp; Local Storage</h2>
            <p className="text-frosty-slate text-sm leading-relaxed mb-3">
              We use minimal browser storage strictly necessary for user experience:
            </p>
            <ul className="space-y-2 text-frosty-slate text-sm list-disc pl-5">
              <li><code>trendly_cookie_consent</code>: Stores your cookie preference (<code>granted</code> or <code>denied</code>) locally in your browser so we do not prompt you repeatedly.</li>
              <li><code>saved_ideas</code>: Stores bookmarked content ideas locally on your device for your convenience. This data remains on your machine and is never uploaded to our servers.</li>
              <li><strong>Analytics Cookies:</strong> When consent is granted, Google Analytics sets first-party cookies (<code>_ga</code>, <code>_ga_*</code>) to distinguish unique sessions anonymously.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl mb-2 text-midnight-abyss">4. Analytics (Google Analytics 4)</h2>
            <p className="text-frosty-slate text-sm leading-relaxed">
              We use Google Analytics 4 (Measurement ID: <code>G-XXXXXXXXXX</code>) with IP anonymization enabled to understand aggregate platform usage, popular tool features, and visitor conversion paths. For visitors in the EU, UK, and Switzerland, analytics cookies are <strong>only loaded after you click "Accept Cookies"</strong> on our consent banner. You can decline or change preferences at any time.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl mb-2 text-midnight-abyss">5. Third-Party AI Processing</h2>
            <p className="text-frosty-slate text-sm leading-relaxed">
              AI analysis requests are processed server-side through OpenRouter API integrations (models including DeepSeek, Google Gemma, Qwen, and Meta Llama). No personally identifiable information (PII), email addresses, or private credentials are sent to AI model providers.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl mb-2 text-midnight-abyss">6. Security &amp; Encryption</h2>
            <p className="text-frosty-slate text-sm leading-relaxed">
              All data transmitted to and from TrendlyInside is encrypted in transit using industry-standard TLS (HTTPS). We implement automated rate-limiting to protect against denial-of-service and automated harvesting.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl mb-2 text-midnight-abyss">7. Contact Us</h2>
            <p className="text-frosty-slate text-sm leading-relaxed">
              For any privacy or data inquiries, reach out directly at <a href="mailto:privacy@trendlyinside.com" className="text-fjord-blue underline">privacy@trendlyinside.com</a> or via our <a href="/contact" className="text-fjord-blue underline">Contact form</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function TermsPage() {
  useSEO({
    title: 'Terms of Service — TrendlyInside',
    description: 'TrendlyInside terms of service for free AI creator intelligence and YouTube content analytics.',
    path: '/terms',
  });
  return (
    <>
      <div className="pt-28 md:pt-32 pb-14 border-b border-glacial-sky/20" style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-midnight-abyss mb-2">Terms of Service</h1>
            <p className="text-frosty-slate text-sm">Last updated: October 2026</p>
          </motion.div>
        </div>
      </div>
      <div className="container-main py-10">
        <div className="max-w-3xl mx-auto card p-8 text-midnight-abyss">
          <h2 className="font-heading font-bold text-xl mb-3">1. Acceptance of Terms</h2>
          <p className="text-frosty-slate mb-6">By using TrendlyInside, you agree to these Terms of Service. If you do not agree, please do not use our service.</p>

          <h2 className="font-heading font-bold text-xl mb-3">2. Use of Service</h2>
          <p className="text-frosty-slate mb-4">TrendlyInside is provided free of charge for personal and commercial use. You agree to:</p>
          <ul className="space-y-1.5 text-frosty-slate text-sm mb-6">
            <li>• Not abuse or attempt to circumvent rate limits</li>
            <li>• Not use the service for illegal purposes</li>
            <li>• Not attempt to scrape or automate mass requests</li>
            <li>• Only analyze publicly available YouTube content</li>
          </ul>

          <h2 className="font-heading font-bold text-xl mb-3">3. AI-Generated Content</h2>
          <p className="text-frosty-slate mb-6">Analysis and recommendations are generated by AI and are provided for informational purposes only. TrendlyInside does not guarantee specific results from using these recommendations. AI outputs may contain inaccuracies.</p>

          <h2 className="font-heading font-bold text-xl mb-3">4. YouTube Content</h2>
          <p className="text-frosty-slate mb-6">TrendlyInside only processes publicly available YouTube content. We respect YouTube's Terms of Service and only use public metadata APIs. We do not store video content.</p>

          <h2 className="font-heading font-bold text-xl mb-3">5. Limitation of Liability</h2>
          <p className="text-frosty-slate mb-6">TrendlyInside is provided "as is" without warranties. We are not liable for any damages arising from the use of our service or reliance on AI-generated recommendations.</p>

          <h2 className="font-heading font-bold text-xl mb-3">6. Contact</h2>
          <p className="text-frosty-slate">Questions about these terms? Contact <a href="mailto:legal@trendlyinside.com" className="text-fjord-blue hover:underline">legal@trendlyinside.com</a>.</p>
        </div>
      </div>
    </>
  );
}
