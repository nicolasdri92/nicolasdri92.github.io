// Confirmar asistencia parallax
$(".parallax-asistencia").parallax({
  imageSrc: "assets/img/confirmar-asistencia.jpg",
});

// Portada parallax
$(".parallax-portada").parallax({
  imageSrc: "assets/img/portada.jpg",
});

// Gracias parallax
$(".parallax-gracias").parallax({
  imageSrc: "assets/img/portada.jpg",
});

// ----------------------

// Portada

var divDressCode = document.querySelector(".scroll-down");
divDressCode.onclick = () => {
  var sectionCuenta = document.getElementById("cuenta-regresiva");
  sectionCuenta.scrollIntoView({ behavior: "smooth" });
};

// ----------------------
// Cuenta regresiva
var fechaInicio = new Date().getTime();
var fechaFin = new Date(fechaCuentaRegresiva).getTime();
var diff = (fechaFin - fechaInicio) / 1000;

// Config countdown
$(".countdown").ClassyCountdown({
  theme: "black",

  labelsOptions: {
    style: "font-size: 15px;font-family: 'Slabo 27px', serif;",
  },

  style: {
    // textResponsive: 0.6,
    secondsElement: {
      gauge: {
        fgColor: "#F00",
      },
    },

    days: {
      gauge: {
        thickness: 0.01,
        fgColor: colorCirculosCuentaRegresiva,
      },
      textCSS: "color:" + colorTextoCuentaRegresiva + ";font-size: 30px !important;font-family: 'Slabo 27px', serif;",
    },

    hours: {
      gauge: {
        thickness: 0.01,
        fgColor: colorCirculosCuentaRegresiva,
      },
      textCSS: "color:" + colorTextoCuentaRegresiva + ";font-size: 30px !important;font-family: 'Slabo 27px', serif;",
    },

    minutes: {
      gauge: {
        thickness: 0.01,
        fgColor: colorCirculosCuentaRegresiva,
      },
      textCSS: "color:" + colorTextoCuentaRegresiva + ";font-size: 30px !important;font-family: 'Slabo 27px', serif;",
    },

    seconds: {
      gauge: {
        thickness: 0.01,
        fgColor: colorCirculosCuentaRegresiva,
      },
      textCSS: "color:" + colorTextoCuentaRegresiva + ";font-size: 30px !important;font-family: 'Slabo 27px', serif;",
    },
  },

  // Fecha finalizacion
  end: $.now() + diff,

  // Al finalizar
  onEndCallback: function () {
    // $('.cuenta-regresiva').hide();
  },
});

// musica

var audios = document.getElementById("audioPrueba");
var playAudio = () => {
  audios.play().catch((error) => {
    console.log("La reproducción automática no está permitida. Haz clic en la página para reproducir el audio.");
    return false;
  });
  $("#btnPlay").addClass("hidden");
  $("#btnPausa").removeClass("hidden");
  $("#btnPausa").addClass("pulse");
};
var pauseAudio = () => {
  audios.pause();
  $("#btnPausa").addClass("hidden");
  $("#btnPlay").removeClass("hidden");
  $("#btnPlay").addClass("vertical_shake");
};

// ----------------------

// Agendar en calendarios

var calendarios = () => {
  formatGoogleCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatMicrosoftOfficeCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatOutlookCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatAppleCalendarLink(fechaInicioEvento, fechaFinEvento);
  formatYahooCalendarLink(fechaInicioEvento, fechaFinEvento);
};

function formatDateToISO8601(inputDate) {
  const date = new Date(inputDate);
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function formatDateToICS(inputDate, zona) {
  const date = new Date(inputDate);
  zona ? date.setHours(date.getHours() - 3) : null;
  const formattedDate = date
    .toISOString()
    .replace(/[:-]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
  return formattedDate;
}

function formatGoogleCalendarLink(startDate, endDate) {
  const formattedStartDate = formatDateToICS(startDate);
  const formattedEndDate = formatDateToICS(endDate);
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarGoogle").attr("href", `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${formattedStartDate}%2F${formattedEndDate}&text=${formattedTituloEvento}&text=${formattedTituloEvento}`);
}

function formatOutlookCalendarLink(startDate, endDate) {
  const formattedStartDate = encodeURIComponent(formatDateToISO8601(startDate));
  const formattedEndDate = encodeURIComponent(formatDateToISO8601(endDate));
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarOutlook").attr("href", `https://outlook.live.com/calendar/0/action/compose?allday=false&enddt=${formattedEndDate}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${formattedStartDate}&subject=${formattedTituloEvento}`);
}

function formatMicrosoftOfficeCalendarLink(startDate, endDate) {
  const formattedStartDate = encodeURIComponent(formatDateToISO8601(startDate));
  const formattedEndDate = encodeURIComponent(formatDateToISO8601(endDate));
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarMicrosoft365").attr(
    "href",
    `https://outlook.office.com/calendar/action/compose?allday=false&enddt=${formattedEndDate}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${formattedStartDate}&subject=${formattedTituloEvento}`
  );
}

function formatAppleCalendarLink(startDate, endDate) {
  const formattedStartDate = formatDateToICS(startDate);
  const formattedEndDate = formatDateToICS(endDate);
  const formattedTituloEvento = encodeURIComponent(tituloEvento).replace(/%20/g, " ");
  $("#LinkCalendarApple").attr(
    "href",
    `data:text/calendar;charset=utf-8,${encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:Evento\nDTSTART:${formattedStartDate}\nDTEND:${formattedEndDate}\nSUMMARY:${formattedTituloEvento}\nEND:VEVENT\nEND:VCALENDAR`)}`
  );
}

function formatYahooCalendarLink(startDate, endDate) {
  const formattedStartDate = formatDateToICS(startDate, true);
  const formattedEndDate = formatDateToICS(endDate, true);
  const formattedTituloEvento = encodeURIComponent(tituloEvento);
  $("#LinkCalendarYahoo").attr("href", `https://calendar.yahoo.com/?dur=&et=${formattedEndDate}&st=${formattedStartDate}&title=${formattedTituloEvento}&v=60`);
}
// ----------------------

// EJECUCIONES AUTOMATICAS

calendarios();

// ----------------------

// EFECTOS VISUALES POR CLASE.

document.addEventListener("DOMContentLoaded", function () {
  var fadeInClass = "fade-in";
  var fadeInDownClass = "fadeInDown";
  var fadeInUpClass = "fadeInUp";
  var fadeInLeft = "fadeInLeft";
  var fadeInRight = "fadeInRight";

  var corazon = document.querySelector(".corazon");
  var ceremonia = document.querySelector(".ceremonia");
  var dresscode = document.querySelector(".dresscode");
  var alojamientos = document.querySelector(".alojamientos");
  var fiesta = document.querySelector(".fiesta");
  var unaColumna = document.querySelector(".unaColumna");
  var instagram = document.querySelector(".instagramText");
  var fraseInsta = document.querySelector(".fraseInsta");
  var regalo = document.querySelector(".regalo");
  var cbuText = document.querySelector(".cbuText");

  var CuentaRegre = document.querySelector(".p_CuentaRegre");
  var card_asistencia = document.querySelector(".card_asistencia");
  var div_dresscode = document.querySelector(".div_dresscode");
  var div_alojamientos = document.querySelector(".div_alojamientos");
  var div_carouserl = document.querySelector(".div_carouserl");
  var div_canciones = document.querySelector(".div_canciones");
  var div_gracias = document.querySelector(".div_gracias");

  
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return rect.bottom >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
  }


  function aplicarAnimacionSiEnViewport(elemento, claseAnimacion, estilo) {
    if (isInViewport(elemento) && !elemento.classList.contains(claseAnimacion)) {
      elemento.classList.add(claseAnimacion);
      if (estilo) {
        elemento.style.opacity = "1";
      }
    }
  }

  document.addEventListener("scroll", function () {
    //--- FadeInDown ---
    CuentaRegre ? aplicarAnimacionSiEnViewport(CuentaRegre, fadeInDownClass, true) : null;
    unaColumna ? aplicarAnimacionSiEnViewport(unaColumna, fadeInDownClass, true) : null;
    fraseInsta ? aplicarAnimacionSiEnViewport(fraseInsta, fadeInDownClass, true) : null;
    cbuText ? aplicarAnimacionSiEnViewport(cbuText, fadeInDownClass, true) : null;

    //--- FadeInUp ---

    //--- FadeInLeft ---
    fiesta ? aplicarAnimacionSiEnViewport(fiesta, fadeInLeft, true) : null;

    //--- FadeInRight ---
    ceremonia ? aplicarAnimacionSiEnViewport(ceremonia, fadeInRight, true) : null;

    //--- FadeIn ---
    card_asistencia ? aplicarAnimacionSiEnViewport(card_asistencia, fadeInClass, true) : null;
    regalo ? aplicarAnimacionSiEnViewport(regalo, fadeInClass, true) : null;
    div_dresscode ? aplicarAnimacionSiEnViewport(div_dresscode, fadeInClass, true) : null;
    instagram ? aplicarAnimacionSiEnViewport(instagram, fadeInClass, true) : null;
    corazon ? aplicarAnimacionSiEnViewport(corazon, fadeInClass, true) : null;
    div_carouserl ? aplicarAnimacionSiEnViewport(div_carouserl, fadeInClass, true) : null;
    div_canciones ? aplicarAnimacionSiEnViewport(div_canciones, fadeInClass, true) : null;
    div_alojamientos ? aplicarAnimacionSiEnViewport(div_alojamientos, fadeInClass, true) : null;
    div_gracias ? aplicarAnimacionSiEnViewport(div_gracias, fadeInClass, true) : null;

  });
});
