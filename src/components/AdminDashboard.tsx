// קובץ מלא: src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';

interface DataItem {
  ID: string;
  Title: string;
  Description: string;
  ActionLink: string;
  Status: string;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // משיכת ה-URL של ה-API ממשתנה הסביבה של Vite
  const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

  useEffect(() => {
    if (!API_URL) {
      setError('שגיאה: משתנה הסביבה VITE_APPS_SCRIPT_URL אינו מוגדר ב-Vercel.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('שגיאה בתקשורת עם השרת');
        }
        const result = await response.json();
        setData(result.data || []);
      } catch (err: any) {
        setError(err.message || 'אירעה שגיאה בזמן משיכת הנתונים');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    <div className="p-6 max-w-7xl mx-auto dir-rtl text-right">
      <div className="mb-6 flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">לוח ניהול נתונים - Noa AI</h1>
          <p className="text-sm text-gray-500 mt-1">ניהול, סנכרון ומעקב בזמן אמת מתוך Google Sheets</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-medium text-gray-600">מחובר לגליון</span>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="mr-3 text-gray-600 font-medium">טוען נתונים מהגליון...</span>
        </div>
      )}

      {error && (
        <div className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200" role="alert">
          <span className="font-bold">שים לב:</span> {error}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-500 font-medium">לא נמצאו נתונים בגליון. הכנס שורות חדשות כדי לראות אותן כאן.</p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pr-4 pl-3 text-right text-sm font-semibold text-gray-900">ID</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">כותרת</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">תיאור</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">סטטוס</th>
                <th scope="col" className="relative py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900">פעולה</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((item, index) => (
                <tr key={item.ID || index} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap py-4 pr-4 pl-3 text-sm font-medium text-gray-900">{item.ID}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 font-medium">{item.Title}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 max-w-md truncate">{item.Description}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      item.Status === 'פעיל' || item.Status === 'Active' 
                        ? 'bg-green-50 text-green-700 ring-green-600/20' 
                        : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                    }`}>
                      {item.Status || 'ללא סטטוס'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-4 pr-3 pl-4 text-left text-sm font-medium">
                    {item.ActionLink ? (
                      <a
                        href={item.ActionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                      >
                        פתח קישור
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs italic">אין לינק</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
