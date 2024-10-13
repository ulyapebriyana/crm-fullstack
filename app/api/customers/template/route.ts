import ExcelJS from 'exceljs';

export async function GET() {
  try {
    const fileName = 'Template import customers';
    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet('Customers');

    const headers = [
      { header: 'First Name', key: 'firstName', width: 20 },
      { header: 'Last Name', key: 'lastName', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone Number', key: 'phoneNumber', width: 15 },
      { header: 'Country', key: 'country', width: 15 },
      { header: 'Language', key: 'language', width: 15 },
      { header: 'Company', key: 'company', width: 20 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'City', key: 'city', width: 15 },
      { header: 'Province', key: 'province', width: 15 },
      { header: 'Zip Code', key: 'zipCode', width: 10 },
      { header: 'Note', key: 'note', width: 25 },
    ];

    worksheet.columns = headers;

    // Style the header row:
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF00' }, // Set background color to yellow
      };
      cell.font = { bold: true }; // Make text bold
      cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Center-align the text
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}.xlsx"`,
        'Content-Type': 'application/vnd.ms-excel',
      },
    });

  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, {
        status: 400,
      });
    }
  }
}
