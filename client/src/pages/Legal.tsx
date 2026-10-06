import { motion } from 'framer-motion';
import { useSEO } from '../lib/seo';

export function PrivacyPage() {
  useSEO({
    title: 'Privacy Policy — TrendlyInside',
    description: 'TrendlyInside privacy policy. We require no user registration, no authentication, and process YouTube URLs with anonymous analytics.',
    path: '/privacy-policy',
  });

  return (
    <>
      <div className="pt-28 md:pt-32 pb-14 border-b border-glacial-sky/20" style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-midnight-abyss mb-2">Privacy Policy</h1>
            <p className="text-frosty-slate text-sm">Last updated: October 2026</p>
          </motion.div>
        </div>
      </div>
      <div className="container-main py-10">
        <div className="max-w-3xl mx-auto card p-8 prose prose-sm text-midnight-abyss">
          <h2 className="font-heading font-bold text-xl mb-3">1. Information We Collect</h2>
          <p className="text-frosty-slate mb-4">TrendlyInside does not require user registration or authentication. We collect only anonymous usage data to improve our service:</p>
          <ul className="space-y-1.5 text-frosty-slate text-sm mb-6">
            <li>• Analysis type (video, shorts, channel)</li>
            <li>• Timestamp of requests</li>
            <li>• Basic browser and device information (via analytics)</li>
            <li>• Page views and tool usage statistics</li>
          </ul>
          <p className="text-frosty-slate mb-6">We do NOT collect names, email addresses, or personal information unless you contact us directly via our contact form.</p>

          <h2 className="font-heading font-bold text-xl mb-3">2. Analytics</h2>
          <p className="text-frosty-slate mb-6">We use Google Analytics and PostHog to understand how our tools are used. These services may collect anonymized data such as IP addresses, browser type, and pages visited. You can opt out of Google Analytics using the <a href="https://tools.google.com/dlpage/gaoptout" className="text-fjord-blue hover:underline">Google Analytics Opt-out Browser Add-on</a>.</p>

          <h2 className="font-heading font-bold text-xl mb-3">3. Advertising</h2>
          <p className="text-frosty-slate mb-6">We use Google AdSense to display ads. Google may use cookies to personalize ads based on your browsing history. You can opt out through <a href="https://adssettings.google.com" className="text-fjord-blue hover:underline">Google Ad Settings</a>.</p>

          <h2 className="font-heading font-bold text-xl mb-3">4. YouTube URLs</h2>
          <p className="text-frosty-slate mb-6">When you paste a YouTube URL for analysis, we temporarily process the URL to retrieve publicly available metadata and generate AI insights. URLs are not permanently stored in association with any user.</p>

          <h2 className="font-heading font-bold text-xl mb-3">5. Cookies</h2>
          <p className="text-frosty-slate mb-6">We use essential cookies for service functionality and third-party cookies from Google Analytics and AdSense. You can control cookies through your browser settings.</p>

          <h2 className="font-heading font-bold text-xl mb-3">6. Contact</h2>
          <p className="text-frosty-slate">For privacy-related questions, contact us at <a href="mailto:privacy@trendlyinside.com" className="text-fjord-blue hover:underline">privacy@trendlyinside.com</a>.</p>
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
