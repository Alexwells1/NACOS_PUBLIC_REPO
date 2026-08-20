import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SupportChannel } from "./contact.types";

interface Props {
  channel: SupportChannel;
  index: number;
}

export function SupportAction({ channel, index }: Props) {
  const Icon = channel.icon;

  const handleClick = () => {
    const message = encodeURIComponent(`Hello ${channel.role}, I am reaching out regarding ${channel.label}...`);
    window.open(`https://wa.me/${channel.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={handleClick}
      className="group w-full flex items-center justify-between py-6 border-b border-[#168706]/10 hover:border-[#168706]/40 transition-colors"
    >
      <div className="flex items-center gap-6">
        <div className="w-10 h-10 flex items-center justify-center text-[#168706] bg-[#168706]/5 rounded-tr-lg rounded-bl-lg group-hover:bg-[#168706] group-hover:text-white transition-all duration-300">
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#082F02]">
            {channel.label}
          </h3>
          <p className="text-xs text-[#082F02]/50 font-medium tracking-tight">
            Directed to: {channel.role}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-[10px] font-bold text-[#168706] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
          Open WhatsApp
        </span>
        <ArrowUpRight className="w-5 h-5 text-[#168706] group-hover:rotate-45 transition-transform" />
      </div>
    </motion.button>
  );
}