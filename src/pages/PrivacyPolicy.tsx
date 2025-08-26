import { ArrowLeft, Shield, FileText, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-tnt-gray hover:text-tnt-orange transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-tnt-orange rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-tnt-black">Privacy Policy</h1>
                <p className="text-sm text-tnt-gray">Effective: August 24, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          
          {/* Table of Contents */}
          <div className="bg-tnt-gray-light rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-tnt-orange" />
              <h2 className="text-xl font-bold text-tnt-black">Contents</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <div className="space-y-1">
                <p className="text-tnt-gray">1. About Us</p>
                <p className="text-tnt-gray">2. About This Privacy Policy</p>
                <p className="text-tnt-gray">3. What Personal Information We Collect</p>
                <p className="text-tnt-gray">4. How We Use Your Personal Information</p>
                <p className="text-tnt-gray">5. Legal Basis for Processing</p>
                <p className="text-tnt-gray">6. How We Share Your Information</p>
              </div>
              <div className="space-y-1">
                <p className="text-tnt-gray">7. Your Marketing Choices</p>
                <p className="text-tnt-gray">8. Data Retention and Deletion</p>
                <p className="text-tnt-gray">9. International Transfers</p>
                <p className="text-tnt-gray">10. Your Data Protection Rights</p>
                <p className="text-tnt-gray">11. Changes to This Policy</p>
                <p className="text-tnt-gray">12. Contact Us</p>
              </div>
            </div>
          </div>

          {/* Privacy Policy Content */}
          <div className="prose prose-lg max-w-none">
            
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-tnt-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tnt-orange text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                About Us
              </h2>
              <p className="text-tnt-gray leading-relaxed">
                "We", "us" or "our" means TNT Services, with its principal place of business located at 745 Ashton Old Rd Manchester England GB M11 2HB.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-tnt-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tnt-orange text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                About This Privacy Policy
              </h2>
              <p className="text-tnt-gray leading-relaxed mb-4">
                Your privacy is important to us, so we've developed this Privacy Policy, which explains how we collect, use, and disclose your personal information. We collect personal information when you use our website(s), mobile apps, and other online and offline products, services and experiences (collectively, the "Services"). Please take a moment to read through this Policy in its entirety.
              </p>
              <p className="text-tnt-gray leading-relaxed">
                If you have any questions, concerns or complaints regarding this Privacy Policy or how we use your personal information please contact us via e-mail at <a href="mailto:tntservicesmanchester@gmail.com" className="text-tnt-orange hover:text-tnt-orange-dark font-medium">tntservicesmanchester@gmail.com</a>.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-tnt-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tnt-orange text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                What Personal Information We Collect
              </h2>
              <p className="text-tnt-gray leading-relaxed mb-4">
                We collect personal information that you provide directly to us:
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-tnt-black mb-2">Contact Information</h4>
                  <p className="text-tnt-gray text-sm">
                    If you sign up to receive our newsletter, emails, or text messages from us, we will collect your name, email address, mailing address, phone number, and any other information needed to contact you about the Services.
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-tnt-black mb-2">Payment Information</h4>
                  <p className="text-tnt-gray text-sm">
                    To order products or services through the Services, you will need to provide us with payment information (like your bank account or credit card information). Please note that your financial information is collected and stored by a third party payment processing company.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-tnt-black mb-2">Survey Information</h4>
                  <p className="text-tnt-gray text-sm">
                    You may provide us with other personal information when you fill in a form, respond to our surveys or questionnaires, provide us with feedback, participate in promotions, or use other features of the Services.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-tnt-black mb-2">Communications Information</h4>
                  <p className="text-tnt-gray text-sm">
                    We may also collect other information during our communications with you, including information that you send to us when interacting with our customer service agents, or when you call us or send emails or text messages.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-tnt-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tnt-orange text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                How We Use Your Personal Information
              </h2>
              <p className="text-tnt-gray leading-relaxed mb-4">
                We use the personal information we collect for the following reasons:
              </p>
              <ul className="space-y-2 text-tnt-gray">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-tnt-orange rounded-full mt-2 flex-shrink-0"></span>
                  To send you our newsletter, or other information or marketing about our Services that you think may be of interest to you.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-tnt-orange rounded-full mt-2 flex-shrink-0"></span>
                  To reply to your questions, inquiries, or customer service requests or to send you notices, updates, security alerts, or support and administrative messages.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-tnt-orange rounded-full mt-2 flex-shrink-0"></span>
                  To provide you with information about the Services that you request from us or which we feel may interest you.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-tnt-orange rounded-full mt-2 flex-shrink-0"></span>
                  To monitor and analyze trends, usage and activities in connection with our Services and to improve the Services.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-tnt-orange rounded-full mt-2 flex-shrink-0"></span>
                  To detect, investigate and prevent fraudulent transactions and other illegal activities on the Services.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-tnt-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tnt-orange text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                Legal Basis for Processing
              </h2>
              <p className="text-tnt-gray leading-relaxed">
                In certain countries we are required to have a legal basis for collecting and using your personal information. Our legal basis will depend on the personal information concerned and the specific context in which we collect it. We will normally collect personal information from you only where we have your consent to do so, where we need your information to perform a contract with you, or where the processing is in our legitimate interests and not overridden by your fundamental rights.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-tnt-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tnt-orange text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                How We Share Your Information
              </h2>
              <p className="text-tnt-gray leading-relaxed mb-4">
                We may share your personal information in the following ways:
              </p>
              <ul className="space-y-2 text-tnt-gray">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-tnt-orange rounded-full mt-2 flex-shrink-0"></span>
                  With vendors, consultants, and other service providers who process your personal information on our behalf when they provide services to us.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-tnt-orange rounded-full mt-2 flex-shrink-0"></span>
                  In connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-tnt-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tnt-orange text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
                Your Marketing Choices
              </h2>
              <p className="text-tnt-gray leading-relaxed mb-4">
                When you sign up for a promotion like a sweepstakes, or subscribe to receive our newsletter or marketing/promotional messages, we use your personal information to help us decide which products, services and offers may be of interest to you.
              </p>
              <p className="text-tnt-gray leading-relaxed">
                You may unsubscribe from marketing messages through a link we include on messages we send you. You can also ask us to stop sending you marketing messages at any time by contacting us at: <a href="mailto:tntservicesmanchester@gmail.com" className="text-tnt-orange hover:text-tnt-orange-dark font-medium">tntservicesmanchester@gmail.com</a>.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-tnt-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tnt-orange text-white rounded-full flex items-center justify-center text-sm font-bold">8</span>
                Data Retention and Deletion
              </h2>
              <p className="text-tnt-gray leading-relaxed">
                Your personal information will not be kept longer than is necessary for the specific purpose for which it was collected. When we decide how long we will keep your information we consider the amount, nature, and sensitivity of the personal information, the potential risk of harm from unauthorized use or disclosure, why we need it, and any relevant legal requirements.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-tnt-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tnt-orange text-white rounded-full flex items-center justify-center text-sm font-bold">9</span>
                International Transfers
              </h2>
              <p className="text-tnt-gray leading-relaxed">
                We will ensure that any transfer of personal information to countries outside of the United States will take place pursuant to the appropriate safeguards.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-tnt-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tnt-orange text-white rounded-full flex items-center justify-center text-sm font-bold">10</span>
                Your Data Protection Rights
              </h2>
              <p className="text-tnt-gray leading-relaxed mb-4">
                Depending on the circumstances, you may have some of the following rights under applicable data protection laws:
              </p>
              <ul className="space-y-2 text-tnt-gray">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-tnt-orange rounded-full mt-2 flex-shrink-0"></span>
                  You may access, correct, or request deletion of your personal information
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-tnt-orange rounded-full mt-2 flex-shrink-0"></span>
                  You may object to processing of your personal information
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-tnt-orange rounded-full mt-2 flex-shrink-0"></span>
                  If we have collected and processed your personal information with your consent, then you can withdraw your consent at any time
                </li>
              </ul>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-tnt-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tnt-orange text-white rounded-full flex items-center justify-center text-sm font-bold">11</span>
                Changes to This Policy
              </h2>
              <p className="text-tnt-gray leading-relaxed">
                From time to time, we have the right to modify this Privacy Policy. When we update this Privacy Policy, we will take appropriate measures to inform you, consistent with the significance of the changes we make. Please come back and check this page from time to time for the latest information on our privacy practices.
              </p>
            </section>

            {/* Section 12 - Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-tnt-black mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-tnt-orange text-white rounded-full flex items-center justify-center text-sm font-bold">12</span>
                Contact Us
              </h2>
              <p className="text-tnt-gray leading-relaxed mb-6">
                The data controller of your personal information is TNT Services. If you have questions or concerns about the information in this Privacy Policy, our handling of your personal information, or your choices and rights regarding such use, please do not hesitate to contact us:
              </p>
              <div className="bg-tnt-gray-light rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-tnt-orange mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-tnt-black">TNT Services</h4>
                      <p className="text-tnt-gray">745 Ashton Old Rd Manchester England GB M11 2HB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-tnt-orange flex-shrink-0" />
                    <a href="mailto:tntservicesmanchester@gmail.com" className="text-tnt-orange hover:text-tnt-orange-dark font-medium">
                      tntservicesmanchester@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Back to Top */}
          <div className="text-center pt-8 border-t border-gray-200">
            <button
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 text-tnt-orange hover:text-tnt-orange-dark font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rotate-90" />
              Back to Top
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
