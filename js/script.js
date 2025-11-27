// ================================================================
// CONFIGURACIÓN GENERAL
// ================================================================

// Tamaño máximo permitido: 4 MB en bytes
const MAX_SIZE = 4 * 1024 * 1024;

// Tipos MIME permitidos (PDF, JPG/JPEG, DOCX)
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

// ================================================================
// FUNCIÓN AUXILIAR: Formatear tamaño de archivo (ej: 2.54 MB)
// ================================================================
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}

// ================================================================
// VALIDAR ARCHIVO Y MOSTRAR FEEDBACK VISUAL
// ================================================================
function validateAndShow(file, infoEl, errorEl, dropArea) {
  // Si no hay archivo, limpiar todo
  if (!file) {
    infoEl.classList.remove("valid", "invalid");
    infoEl.textContent = "";
    errorEl.textContent = "";
    dropArea.classList.remove("valid", "invalid");
    return true;
  }

  // Validar tipo de archivo
  if (!ALLOWED_TYPES.includes(file.type)) {
    errorEl.textContent = "Solo se permiten PDF, JPG/JPEG o DOCX";
    infoEl.classList.remove("valid");
    infoEl.classList.add("invalid");
    infoEl.textContent = `No permitido: ${file.name}`;
    dropArea.classList.add("invalid");
    dropArea.classList.remove("valid");
    return false;
  }

  // Validar tamaño
  if (file.size > MAX_SIZE) {
    errorEl.textContent = `Muy grande: ${formatFileSize(
      file.size
    )} (máximo 4 MB)`;
    infoEl.classList.remove("valid");
    infoEl.classList.add("invalid");
    infoEl.textContent = `Excede el límite: ${file.name}`;
    dropArea.classList.add("invalid");
    return false;
  }

  // Todo correcto
  errorEl.textContent = "";
  infoEl.classList.remove("invalid");
  infoEl.classList.add("valid");
  infoEl.textContent = `${file.name} (${formatFileSize(file.size)})`;
  dropArea.classList.add("valid");
  dropArea.classList.remove("invalid");
  return true;
}

// ================================================================
// CONFIGURAR DRAG & DROP PARA CADA ZONA
// ================================================================
["transcript", "utilityBill", "certificates"].forEach((id) => {
  const input = document.getElementById(id); // Input file
  const dropArea = input.closest(".drop-area"); // Área visual
  const infoEl = document.getElementById(
    id === "utilityBill" ? "utilityInfo" : id + "Info" // Info del archivo
  );
  const errorEl = document.getElementById(
    id === "utilityBill" ? "utilityBillError" : id + "Error" // Mensaje de error
  );

  // Al hacer clic en el área → abrir selector de archivos
  dropArea.addEventListener("click", () => input.click());

  // Efecto visual al arrastrar sobre el área
  ["dragenter", "dragover"].forEach((event) => {
    dropArea.addEventListener(event, (e) => {
      e.preventDefault();
      dropArea.classList.add("dragover");
    });
  });

  // Quitar efecto al salir o soltar
  ["dragleave", "drop"].forEach((event) => {
    dropArea.addEventListener(event, (e) => {
      e.preventDefault();
      dropArea.classList.remove("dragover");
    });
  });

  // Al soltar archivo
  dropArea.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      input.files = files; // Asignar archivo al input
    }
    validateAndShow(files[0], infoEl, errorEl, dropArea);
  });

  // Al seleccionar con el botón tradicional
  input.addEventListener("change", () => {
    validateAndShow(input.files[0], infoEl, errorEl, dropArea);
  });
});

// ================================================================
// ENVÍO DEL FORMULARIO
// ================================================================
document
  .getElementById("scholarshipForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar envío real (solo simulación)
    let isValid = true;

    // Lista de campos obligatorios de texto/select
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "dob",
      "address",
      "gpa",
      "fieldStudy",
      "semesters",
      "income",
      "financialNeed",
      "scholarship",
    ];

    requiredFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (!field.value || !field.value.trim()) {
        document.getElementById(fieldId + "Error").textContent =
          "Este campo es obligatorio.";
        isValid = false;
      }
    });

    // Validar archivos obligatorios
    if (!document.getElementById("transcript").files.length) {
      document.getElementById("transcriptError").textContent =
        "Falta el certificado de notas.";
      isValid = false;
    }
    if (!document.getElementById("utilityBill").files.length) {
      document.getElementById("utilityBillError").textContent =
        "Falta la copia de servicios públicos.";
      isValid = false;
    }

    // Validar checkboxes de elegibilidad
    if (
      !document.getElementById("eligibility1").checked ||
      !document.getElementById("eligibility2").checked
    ) {
      document.getElementById("eligibilityError").textContent =
        "Debe aceptar ambas condiciones.";
      isValid = false;
    }

    // Si todo está bien → simular envío exitoso
    if (isValid) {
      const btn = document.getElementById("submitBtn");
      btn.disabled = true;
      btn.textContent = "Enviando solicitud...";

      setTimeout(() => {
        document.getElementById("successMessage").style.display = "block";
        btn.disabled = false;
        btn.textContent = "Enviar Solicitud";
        e.target.reset(); // Limpiar formulario
        document.querySelectorAll(".drop-area, .file-info").forEach((el) => {
          el.classList.remove("valid", "invalid");
        });
        document
          .getElementById("successMessage")
          .scrollIntoView({ behavior: "smooth" });
      }, 1800);
    }
  });
