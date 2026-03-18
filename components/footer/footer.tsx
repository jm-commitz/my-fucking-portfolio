'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Shape from '@/components/svg/shape';

import Button from '@/components/button/button';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [result, setResult] = useState("");

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/jm-commitz" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/jaymark-ancheta-8511b430b/" },
        { name: "Email", url: "mailto:anchetajaymark69@gmail.com" }
    ];

    return (
        <footer className="w-full bg-[#0B2D72] text-[#F9F8F6] py-24 md:py-32 relative overflow-hidden" id="contact">
            {/* Background Shape - Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 translate-x-1/2 -translate-y-1/2 rotate-12">
                <Shape className="w-full h-full" />
            </div>

            <div className="container mx-auto px-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column: Tagline */}
                    <div className="flex flex-col space-y-8">
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">// project inquiry</span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-7xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.8]"
                        >
                            let's build <br />something.
                        </motion.h2>

                        {/* Additional Info / CTA helper could go here */}
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="flex flex-col space-y-12">
                        <form 
                            className="flex flex-col space-y-10" 
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                formData.append("access_key", "deabde3a-e647-49d1-9389-c75f37e0d208");

                                setResult("Sending...");

                                try {
                                    const response = await fetch("https://api.web3forms.com/submit", {
                                        method: "POST",
                                        body: formData
                                    });

                                    const data = await response.json();

                                    if (data.success) {
                                        setResult("Success!");
                                        (e.target as HTMLFormElement).reset();
                                        setTimeout(() => setResult(""), 3000); // Clear message after 3 seconds
                                    } else {
                                        setResult("Error");
                                    }
                                } catch (error) {
                                    console.log(error);
                                    setResult("Error");
                                }
                            }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold group-focus-within:opacity-100 transition-opacity">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Enter your name" 
                                        className="bg-transparent border-x-0 border-t-0 border-b border-[#F9F8F6]/20 py-2 focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 focus:border-b-[#F9F8F6] transition-colors placeholder:opacity-20"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold group-focus-within:opacity-100 transition-opacity">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="email@example.com" 
                                        className="bg-transparent border-x-0 border-t-0 border-b border-[#F9F8F6]/20 py-2 focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 focus:border-b-[#F9F8F6] transition-colors placeholder:opacity-20"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2 group">
                                <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold group-focus-within:opacity-100 transition-opacity">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    placeholder="What are we talking about?" 
                                    className="bg-transparent border-x-0 border-t-0 border-b border-[#F9F8F6]/20 py-2 focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 focus:border-b-[#F9F8F6] transition-colors placeholder:opacity-20"
                                />
                            </div>

                            <div className="flex flex-col space-y-2 group">
                                <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold group-focus-within:opacity-100 transition-opacity">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4} 
                                    placeholder="Tell me about your project" 
                                    className="bg-transparent border-x-0 border-t-0 border-b border-[#F9F8F6]/20 py-2 focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 focus:border-b-[#F9F8F6] transition-colors placeholder:opacity-20 resize-none"
                                />
                            </div>

                            <div className="pt-4 flex flex-col md:flex-row items-center gap-6">
                                <Button
                                    size="lg"
                                    className="w-full md:w-auto px-12 uppercase"
                                    variant="inverse"
                                >
                                    Send Message
                                </Button>
                                {result && (
                                    <span className={`text-sm font-bold uppercase tracking-widest ${result === "Success!" ? "text-green-400" : result === "Sending..." ? "text-white/40" : "text-red-400"}`}>
                                        {result}
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Bottom Section: Links and Copy - Now absolute or part of the grid flow below */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 pt-24 mt-24 border-t border-[#F9F8F6]/10">
                    {/* Links */}
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg md:text-xl font-bold uppercase tracking-tight hover:opacity-50 transition-opacity duration-300 flex items-center gap-2 group"
                                whileHover={{ x: 5 }}
                            >
                                <span>{link.name}</span>
                                <div className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Shape className="w-full h-full" />
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col space-y-2 items-start md:items-end">
                        <p className="text-sm font-bold uppercase tracking-widest opacity-40">
                            © {currentYear} Jaymark Ancheta
                        </p>
                        <p className="text-xs opacity-30 italic">
                            made with too much coffee.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
