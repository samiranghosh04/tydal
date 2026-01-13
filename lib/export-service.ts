import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { DailyLog } from './data-service';

export async function exportToCsv(logs: DailyLog[]): Promise<void> {
  try {
    let csv = 'Date,Flow Rate,Notes,Mood\n';

    for (const log of logs) {
      const date = log.date;
      const flow = log.flow_rate;
      const notes = (log.notes || '').replace(/"/g, '""');
      const mood = (log.mood || '').replace(/"/g, '""');

      csv += `${date},${flow},"${notes}","${mood}"\n`;
    }

    const fileName = `period-tracker-${new Date().toISOString().split('T')[0]}.csv`;
    const filePath = FileSystem.documentDirectory + fileName;

    await FileSystem.writeAsStringAsync(filePath, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(filePath, {
        mimeType: 'text/csv',
        dialogTitle: 'Export Period Data',
        UTI: 'public.comma-separated-values-text',
      });
    } else {
      throw new Error('Sharing is not available on this device');
    }
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    throw error;
  }
}

export async function generatePdfReport(logs: DailyLog[]): Promise<void> {
  try {
    // Generate HTML content
    const html = generatePdfHtml(logs);

    const fileName = `period-report-${new Date().toISOString().split('T')[0]}.html`;
    const filePath = FileSystem.documentDirectory + fileName;

    await FileSystem.writeAsStringAsync(filePath, html, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(filePath, {
        mimeType: 'text/html',
        dialogTitle: 'Export Period Report',
        UTI: 'public.html',
      });
    } else {
      throw new Error('Sharing is not available on this device');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

function generatePdfHtml(logs: DailyLog[]): string {
  const now = new Date().toLocaleDateString();
  const totalDays = logs.length;

  let flowDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  logs.forEach((log) => {
    flowDistribution[log.flow_rate as keyof typeof flowDistribution]++;
  });

  const avgFlowRate =
    logs.length > 0
      ? (logs.reduce((sum, log) => sum + log.flow_rate, 0) / logs.length).toFixed(1)
      : 0;

  const logsHtml = logs
    .map(
      (log) =>
        `
    <tr>
      <td>${log.date}</td>
      <td>${log.flow_rate}</td>
      <td>${log.mood || '-'}</td>
      <td>${log.notes ? log.notes.substring(0, 50) + '...' : '-'}</td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Period Tracker Report</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          background: #f5f5f5;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        h1 {
          color: #e91e63;
          margin: 0;
        }
        .stats {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .stat-box {
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          flex: 1;
          min-width: 200px;
        }
        .stat-label {
          color: #666;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .stat-value {
          color: #e91e63;
          font-size: 28px;
          font-weight: bold;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          margin-top: 20px;
        }
        th {
          background: #e91e63;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: bold;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #eee;
        }
        tr:hover {
          background: #f9f9f9;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          color: #999;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Period Tracker Report</h1>
        <p>Generated on ${now}</p>
      </div>

      <div class="stats">
        <div class="stat-box">
          <div class="stat-label">Total Logged Days</div>
          <div class="stat-value">${totalDays}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Average Flow Rate</div>
          <div class="stat-value">${avgFlowRate}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Heavy Days (4-5)</div>
          <div class="stat-value">${flowDistribution[4] + flowDistribution[5]}</div>
        </div>
      </div>

      <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #e91e63; margin-top: 0;">Flow Distribution</h3>
        <div style="display: flex; gap: 10px;">
          ${Object.entries(flowDistribution)
            .map(
              ([level, count]) =>
                `<div style="flex: 1; text-align: center;">
            <div style="background: #e91e63; height: ${Math.max(30, count * 30)}px; border-radius: 4px;"></div>
            <div style="margin-top: 10px; font-size: 14px;">Level ${level}</div>
            <div style="font-weight: bold; color: #e91e63;">${count}</div>
          </div>`
            )
            .join('')}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Flow</th>
            <th>Mood</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${logsHtml}
        </tbody>
      </table>

      <div class="footer">
        <p>Your data is private and stored locally on your device.</p>
      </div>
    </body>
    </html>
  `;
}
