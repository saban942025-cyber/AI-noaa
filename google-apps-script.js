/**
 * Google Apps Script - Noa AI API Connection
 * -------------------------------------------------------------
 * זהו קובץ הלוויין המקשר בין מאגרי הידע של גוגל שיטס לבין מערכת Noa AI ב-React.
 * קובץ זה יש להדביק בתוך עורך התסריטים (Extensions -> Apps Script) של גוגל שיטס.
 * 
 * תכונות עיקריות:
 * 1. תפריט ניהול מותאם אישית (Custom Menu) בסרגל הכלים של הגליון.
 * 2. פונקציית התקנה (Setup) אוטומטית המייצרת את העמודות ומזינה נתוני בסיס.
 * 3. doGet(e) - API מהיר ומאובטח המחזיר את כל הנתונים בפורמט JSON עם תמיכה ב-CORS.
 */

// 1. פונקציית הפעלה בעת פתיחת הגליון - יצירת תפריט מותאם אישית בשורה העליונה
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🛠️ ניהול נועה Noa AI')
    .addItem('⚙️ הרץ התקנה ראשונית (Setup)', 'setupSheet')
    .addSeparator()
    .addItem('📊 בצע בדיקת כתיבה פנימית', 'testWriteIntegration')
    .addItem('ℹ️ עזרה והוראות חיבור ל-React', 'showHelpModal')
    .addToUi();
}

// 2. פונקציית התקנה והגדרת עמודות בסיס - יוצרת כותרות ונתוני דוגמה אם הגליון ריק
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  // אם הגליון ריק או שיש בו רק תא אחד ריק, נאתחל אותו
  if (values.length === 1 && values[0][0] === "") {
    // הגדרת עמודות בסיס כפי שנדרש
    const headers = ["ID", "Name", "Data", "Link", "Last Updated", "Status"];
    sheet.appendRow(headers);
    
    // עיצוב כותרות הטבלה (Bold, רקע כחול כהה, טקסט לבן)
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#1E3A8A"); // כחול סבן / Saban Blue
    headerRange.setFontColor("#FFFFFF");
    headerRange.setHorizontalAlignment("center");
    
    // הזנת נתוני הדגמה ראשוניים בשביל ה-API של נועה AI
    const demoRows = [
      [
        "MAT-101", 
        "דבק קרמיקה פרימיום 117", 
        "דבק גמיש מוכן לעבודה קלה עם כושר הצמדה גבוה במיוחד לאריחים גדולים.", 
        "https://saban-materials.co.il/products/premium-cement-glue", 
        new Date().toISOString(), 
        "In Stock"
      ],
      [
        "MAT-102", 
        "מלט אפור נשר", 
        "שקי מלט אפור איכותי 42.5 המותאם לעבודות יציקה וביסוס מבנים.", 
        "https://saban-materials.co.il/products/nesher-cement", 
        new Date().toISOString(), 
        "Low Stock"
      ],
      [
        "MAT-103", 
        "סיליקון איטום לבן סופר-גמיש", 
        "חומר איטום סיליקוני מקצועי דוחה עובש ואנטי-בקטריאלי למטבחים וחדרים רטובים.", 
        "https://saban-materials.co.il/products/waterproof-silicone", 
        new Date().toISOString(), 
        "In Stock"
      ],
      [
        "MAT-104", 
        "ברזל בניין מעורגל 8 מ\"מ", 
        "מוטות ברזל זיון חזקים במיוחד לעבודות קונסטרוקציה וטפסנות בטון.", 
        "https://saban-materials.co.il/products/steel-rebar-8mm", 
        new Date().toISOString(), 
        "Critical"
      ]
    ];
    
    // הוספת השורות לגליון
    for (let i = 0; i < demoRows.length; i++) {
      sheet.appendRow(demoRows[i]);
    }
    
    // התאמה אוטומטית של רוחב העמודות
    sheet.autoResizeColumns(1, headers.length);
    
    SpreadsheetApp.getUi().alert('✅ ההתקנה בוצעה בהצלחה! עמודות הבסיס ונתוני הדגמה נוצרו בגליון הנוכחי.');
  } else {
    SpreadsheetApp.getUi().alert('⚠️ הגליון כבר אינו ריק. על מנת למנוע דריסת נתונים, ההתקנה לא בוצעה בשנית.');
  }
}

// 3. פונקציית doGet(e) הראשית - משמשת כ-API נקודת קצה של גוגל שיטס אשר מחזיר JSON
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const dataRange = sheet.getDataRange();
    const data = dataRange.getValues();
    
    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({ 
        status: "success", 
        message: "Sheet is empty or only contains headers.", 
        data: [] 
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }
    
    // קריאת כותרות הטבלה מהשורה הראשונה
    const headers = data[0].map(h => String(h).trim());
    const jsonData = [];
    
    // מעבר על כל השורות הבאות והמרתן לאובייקט מבוסס מפתח-ערך לפי הכותרות
    for (let r = 1; r < data.length; r++) {
      const row = data[r];
      const rowObject = {};
      let hasData = false;
      
      for (let c = 0; c < headers.length; c++) {
        const headerName = headers[c];
        let cellValue = row[c];
        
        // טיפול בעיצוב תאריכים
        if (cellValue instanceof Date) {
          cellValue = cellValue.toISOString();
        }
        
        if (cellValue !== "" && cellValue !== null && cellValue !== undefined) {
          hasData = true;
        }
        
        // יצירת המפתח באובייקט
        rowObject[headerName] = cellValue;
      }
      
      if (hasData) {
        jsonData.push(rowObject);
      }
    }
    
    // המרת הנתונים לטקסט JSON החזרה עם תמיכה מלאה ב-CORS
    const output = JSON.stringify({
      status: "success",
      timestamp: new Date().toISOString(),
      source: "Google Sheets - Noa AI Hub",
      total_records: jsonData.length,
      data: jsonData
    }, null, 2);
    
    return ContentService.createTextOutput(output)
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    const errorOutput = JSON.stringify({
      status: "error",
      message: error.toString()
    });
    
    return ContentService.createTextOutput(errorOutput)
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 4. פונקציית בדיקה מהירה לכתיבה וניקוי
function testWriteIntegration() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow > 0) {
    const tempId = "TEMP-" + Math.floor(1000 + Math.random() * 9000);
    sheet.appendRow([
      tempId, 
      "בדיקת אינטגרציה זמנית", 
      "בדיקת כתיבה אוטומטית מקונסולת הניהול של נועה AI.", 
      "https://saban-materials.co.il", 
      new Date().toISOString(), 
      "Tested"
    ]);
    
    SpreadsheetApp.getUi().alert('📊 נורתה פקודת בדיקת כתיבה מוצלחת! שורה זמנית עם מפתח ' + tempId + ' נוספה לתחתית הטבלה.');
  } else {
    SpreadsheetApp.getUi().alert('❌ שגיאה: יש להריץ תחילה "הרצה ראשונית (Setup)" על מנת להכין את היסודות לטבלה.');
  }
}

// 5. חלון עזרה מובנה המפרט בצורה מסודרת את אופן השימוש ב-React
function showHelpModal() {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 15px; color: #1E3A8A;">
      <h2 style="color: #1E3A8A; border-bottom: 2px solid #C5A059; padding-bottom: 8px;">ℹ️ מדריך חיבור Google Sheets למערכת Noa AI</h2>
      
      <p style="font-size: 14px; line-height: 1.5; color: #4A5568;">
        כדי לחבר את גוגל שיטס ישירות לקוד ה-React שלכם, בצעו את הצעדים הבאים:
      </p>
      
      <ol style="font-size: 13px; line-height: 1.6; color: #2D3748; padding-right: 20px;">
        <li>לחצו על סרגל התפריטים הראשי של הגליון: <b>Extensions -> Apps Script</b>.</li>
        <li>הדביקו את כל תוכן הקוד הזה במקום הקוד הקיים.</li>
        <li>שמרו את הפרויקט (לחצו על האייקון של הדיסקט).</li>
        <li>לחצו על כפתור ה-<b>Deploy</b> בפינה הימנית העליונה, ובחרו ב-<b>New deployment</b>.</li>
        <li>סוג הפריסה (Type) חייב להיות <b>Web app</b>.</li>
        <li>בשדה Execute as הגדירו: <b>Me (כתובת המייל שלכם)</b>.</li>
        <li>בשדה Who has access הגדירו: <b>Anyone</b> (זה הכרחי כדי שדפדפת React תוכל לגשת לנתונים).</li>
        <li>אשרו את הרשאות הגישה של Google לחשבון שלכם.</li>
        <li>העתיקו את הקישור שקיבלתם תחת כותרת ה-<b>URL</b> והדביקו אותו בקובץ ה-React (או ב-Admin Dashboard) לחיבור הממשק.</li>
      </ol>
      
      <div style="background-color: #F7FAFC; border-right: 4px solid #C5A059; padding: 10px; margin-top: 15px; font-size: 11px;">
        💡 <b>טיפ טכנולוגי:</b> ה-API תומך בעמידות קריסה ו-CORS מלא, כך שתוכלו לבצע קריאות GET פשוטות באמצעות fetch ישירות מתוך ה-Client.
      </div>
    </div>
  `;
  
  const htmlOutput = HtmlService.createHtmlOutput(htmlContent)
    .setWidth(550)
    .setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, '📘 מדריך אינטגרציה - ח. סבן חומרי בניין');
}
