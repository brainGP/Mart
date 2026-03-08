"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

interface LoveLetterProps {
  onClose: () => void;
}

export default function LoveLetter({ onClose }: LoveLetterProps) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"cn" | "mn" | "en">("mn");
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const correctPassword = "247";
 const messages = {
   mn: {
      title: "Захидал",
      part1:
        "Сайн уу, Хайрт энэ өдрийн мэндийг хүргий❤️, өнөөдөр Монголд 2026.3.9 -ний 4:00 болж байгаа байх харин хайр Финланд 22:00 болж байгаа. Би одоо нэг зүйлийг тодорхой болгох гээд... Аанхан...  Хэдийгээр хоёулаа танилцаад удаагүй бас биетээр гэхиймуу одоогоор уулзаагүй ч, би чамайг маш сайн мэддэг юм шиг мэдрэмж авдаг. Тийм учраас энэ захидлыг бичээд сууж байна.",
      part2:
        "Миний хэлэхийг хүсэж байгаа зүйл: Чи миний сэтгэлд маш онцгой газар эзэлдэг. Бид хоёул нэг нэгнээ сайн ойлгож (аймар сонин ижил төстэй зүйлүүд аймаар их байдаг, нэг талаараа гоё), энгийн биш дотны мэдрэмж дандаа мэдэрч авдаг. Надаа дандаа инээд баяр хөөр, аз жаргал бэлэглэдэг❤️❤️❤️",
      part3:
        "Би чамд энэ захидлыг бичиж байгаа шалтгаан нь хайрт-д сэтгэлээ илчлэх бас дотроо бодож явдаг зүйлээ хэлмээр санагдсан. Хэрвээ чи зөвшөөрвөл, надтай хамт миний амьдарлын нэг хэсэг болох уу🥹. Би амлаж байна аа дандаа хамтдаа инээлдэж, хөгжилдөж, хамгийн гоё гэсэн зүйлүүдийг хамт хийнэээээээ",
        part4:
        "Хайраа, чи минь аль хэдийн миний сэтгэлд үнэхээр онцгой хүн болсон. Миний энэ захидал чамд хүрнэ гэдэгт итгэж байна💖",
      closing:
       "Эцэст нь хэлэхэд МИНИЙ НАЙЗ ОХИН болох уу...",
    },
  };

  // Scroll detection
  useEffect(() => {
    const el = letterRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setShowScrollHint(scrollTop + clientHeight < scrollHeight - 10);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [letterRef, open]);

  const handlePasswordSubmit = () => {
    if (passwordInput === correctPassword) {
      setAccessGranted(true);
      setOpen(true);
    } else {
      alert("Нууц үг буруу байна! 😢");
      setPasswordInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-11/12 p-6 sm:p-10 relative overflow-hidden"
      >
        {!accessGranted ? (
          <>
            <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
              Захидлыг нээхийн тулд нууц үгээ оруулна уу 💌
            </h2>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Нууц үг"
              className="w-full p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-6 text-center"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePasswordSubmit}
              className="w-full px-6 py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-400 transition shadow-lg"
            >
              Нээх
            </motion.button>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            {open && <Confetti recycle={false} numberOfPieces={250} />}
            <div
              ref={letterRef}
              className="overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-transparent"
            >
              <h2 className="text-2xl font-extrabold text-pink-600 mb-4 text-center">
                {messages.mn.title}
              </h2>
              <p className="text-gray-800 text-base mb-3 leading-relaxed">
                {messages.mn.part1}
              </p>
              <p className="text-gray-800 text-base mb-3 leading-relaxed">
                {messages.mn.part2}
              </p>
              <p className="text-gray-800 text-base mb-3 leading-relaxed">
                {messages.mn.part3}
              </p>
                <p className="text-gray-800 text-base mb-3 leading-relaxed">
                {messages.mn.part4}
              </p>
              <p className="mt-4 font-semibold text-pink-500 leading-snug">
                {messages.mn.closing}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
            >
              ✕
            </button>

            {/* Scroll hint */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-pink-400 animate-bounce">
              ↓ scroll
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}