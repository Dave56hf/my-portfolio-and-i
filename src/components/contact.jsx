import React from "react";
import { FaSquareWhatsapp, FaSquareXTwitter, FaSquareGithub } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi"; // optional arrow

export default function Contact() {
  const links = [
    {
      name: "Whatsapp",
      icon: FaSquareWhatsapp, 
      href: "https://wa.me/qr/YVJCNRNTMY24H1",
    },
    {
      name: "XTwitter",
      icon: FaSquareXTwitter,
      href: "https://x.com/Dave_QuestXS",
    },
    {
      name: "GitHub",
      icon: FaSquareGithub,
      href: "https://github.com/Dave56hf",
    },
    {
      name: "Email",
      icon: IoMdMail,
      href: "mailto:dave@example.com",
    },
  ];

  return (
    <section className="py-20 px-6 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Contact<span className="text-cyan-400">.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-16">
          Contact me or follow my social media
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-8 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <span className="text-white text-xl font-medium">
                    {link.name}
                  </span>
                </div>

                <FiExternalLink className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition" />
              </a>
            );
          })}
        </div>

       
      </div>
    </section>
  );
}
