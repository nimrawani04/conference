// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import { useState } from "react";
import PageLayout from "./PageLayout";
import { Mail, MapPin, Send, Phone, User } from "lucide-react";
import { useYear } from "../context/yearContext";
import conferenceData from "../content/conferenceData";

function Contact() {
  const { selectedYear } = useYear();
  const is2024 = selectedYear === 2024;
  const data = conferenceData[selectedYear];
  const meta = data?.meta || conferenceData[2026].meta;

  const contact2024 = is2024 ? data.contact : null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    alert("✅ Feedback sent successfully!");
    setFormData({ name: "", email: "", feedback: "" });
  };

  const email = is2024 ? contact2024.email : "aaiconferences@gmail.com";
  const location = is2024 ? contact2024.location : "Central University of Kashmir, India";
  const mapSrc = is2024 ? contact2024.mapEmbed : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.680615552739!2d74.72459227572418!3d34.23117257309002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e19d996de5015d%3A0x5cdc403498de0f0e!2sCentral%20University%20of%20Kashmir!5e0!3m2!1sen!2sin!4v1758301985418!5m2!1sen!2sin";
  const mapLink = is2024 ? contact2024.mapLink : "https://maps.app.goo.gl/36i9dDJWYn9n3nRS7";

  return (
    <PageLayout 
      title="Contact Us"
      subtitle="Get in touch with the conference organizers"
    >
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Contact Information */}
        <div className="linear-card p-6">
          <h3 className="text-2xl font-bold text-zinc-950 dark:text-zinc-100 mb-6">
            Contact Information
          </h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <Mail size={20} className="text-[#5E6AD2] dark:text-[#c9a86a] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-zinc-950 dark:text-zinc-100">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="text-[#5E6AD2] dark:text-[#c9a86a] hover:underline"
                >
                  {email}
                </a>
                {is2024 && contact2024.alternateEmail && (
                  <>
                    <br />
                    <a
                      href={`mailto:${contact2024.alternateEmail}`}
                      className="text-[#5E6AD2] dark:text-[#c9a86a] hover:underline text-sm"
                    >
                      {contact2024.alternateEmail}
                    </a>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-[#5E6AD2] dark:text-[#c9a86a] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-zinc-950 dark:text-zinc-100">Location</p>
                <p className="text-zinc-700 dark:text-zinc-400">{location}</p>
              </div>
            </div>

            {is2024 && contact2024.contactPerson && (
              <div className="flex items-start gap-3">
                <User size={20} className="text-[#5E6AD2] dark:text-[#c9a86a] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-zinc-950 dark:text-zinc-100">Contact Person</p>
                  <p className="text-zinc-700 dark:text-zinc-400">{contact2024.contactPerson}</p>
                </div>
              </div>
            )}

            {is2024 && contact2024.phone && (
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-[#5E6AD2] dark:text-[#c9a86a] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-zinc-950 dark:text-zinc-100">Phone</p>
                  <a
                    href={`tel:${contact2024.phone}`}
                    className="text-[#5E6AD2] dark:text-[#c9a86a] hover:underline"
                  >
                    {contact2024.phone}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="mt-6">
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <iframe
                title="map"
                src={mapSrc}
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg border border-gray-300 dark:border-zinc-700"
              ></iframe>
            </a>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="linear-card p-6">
          <h3 className="text-2xl font-bold text-zinc-950 dark:text-zinc-100 mb-6">
            Send Us Your Feedback
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#5E6AD2] dark:focus:ring-[#c9a86a] focus:border-[#5E6AD2] dark:focus:border-[#c9a86a] outline-none   placeholder:text-gray-400 dark:placeholder:text-zinc-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#5E6AD2] dark:focus:ring-[#c9a86a] focus:border-[#5E6AD2] dark:focus:border-[#c9a86a] outline-none   placeholder:text-gray-400 dark:placeholder:text-zinc-500"
              />
            </div>
            
            <div>
              <label htmlFor="feedback" className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                rows="5"
                value={formData.feedback}
                onChange={handleChange}
                required
                placeholder="Share your thoughts, suggestions, or questions..."
                className="w-full border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#5E6AD2] dark:focus:ring-[#c9a86a] focus:border-[#5E6AD2] dark:focus:border-[#c9a86a] outline-none   placeholder:text-gray-400 dark:placeholder:text-zinc-500"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#5E6AD2] dark:bg-[#c9a86a] hover:bg-[#4a52b5] dark:hover:bg-[#b8935a] text-white dark:text-zinc-950 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Send Feedback
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}

export default Contact;
