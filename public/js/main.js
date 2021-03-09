$(document).ready(function () {
  var table = $("#datatable").DataTable({
    dom: "Bflrtip",
    buttons: [
      {
        extend: "pdfHtml5",
        text: '<i class="fa fa-files-o" aria-hidden="true"></i> Copy',
        className: "btn-secondary",
        titleAttr: "Copy",
      },
      {
        extend: "csvHtml5",
        text: '<i class="fa fa-file-excel-o" aria-hidden="true"></i> CSV',
        className: "btn-success",
        titleAttr: "CSV",
      },
      {
        extend: "pdfHtml5",
        text: '<i class="fa fa-file-pdf-o" aria-hidden="true"></i> PDF',
        className: "btn-danger",
        titleAttr: "PDF",
      },
    ],
  });
});
