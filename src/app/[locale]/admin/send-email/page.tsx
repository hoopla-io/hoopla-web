"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";

interface EmailData {
  id: string;
  email: string;
}

export default function SendEmailsPage() {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      const { data, error } = await supabase
        .from("newsletters")
        .select("id, email");
      if (error) {
        console.error("Error fetching emails:", error.message);
      } else {
        setEmails(data || []);
      }
    };

    fetchEmails();
  }, []);

  const handleCheckboxChange = (email: string, checked: boolean) => {
    setSelectedEmails((prev) =>
      checked ? [...prev, email] : prev.filter((e) => e !== email)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedEmails(checked ? emails.map((email) => email.email) : []);
  };

  const onSubmit = async (data: { message: string }) => {
    if (selectedEmails.length === 0) {
      alert("Please select at least one email.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/send-newsletter", {
        emails: selectedEmails,
        message: data.message,
      });

      if (response.status === 200) {
        alert("Emails sent successfully!");
        reset();
      } else {
        console.error("Failed to send emails:", response.data);
      }
    } catch (error) {
      console.error("Error sending emails:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-4 mt-10">
          Send Email Notifications
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div className="mb-4">
            <textarea
              {...register("message", { required: true })}
              placeholder="Enter your notification message..."
              className="w-full p-4 border rounded"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className={`px-4 py-2 bg-primary text-white rounded ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>

        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={
                    selectedEmails.length === emails.length && emails.length > 0
                  }
                />
              </th>
              <th className="p-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email.id} className="border-b">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedEmails.includes(email.email)}
                    onChange={(e) =>
                      handleCheckboxChange(email.email, e.target.checked)
                    }
                  />
                </td>
                <td className="p-4">{email.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
