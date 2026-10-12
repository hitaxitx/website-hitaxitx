"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Language = "es" | "en";

const translations: Record<string, string> = {
  "Inicio": "Home",
  "Tarifas": "Rates",
  "Nuestra Flota": "Our Fleet",
  "Servicios": "Services",
  "Conductores": "Drivers",
  "Síguenos": "Follow Us",
  "Síguenos en Beacons": "Follow us on Beacons",
  "Llamar": "Call",
  "Llamar al (214) 893-6969": "Call (214) 893-6969",
  "Disponible 24/7 en Dallas": "Available 24/7 in Dallas",
  "Tu taxi de confianza en Dallas,": "Your trusted taxi in Dallas,",
  "cuando lo necesitas.": "when you need it.",
  "Rápido, seguro y en tu idioma.": "Fast, safe, and in your language.",
  "Traslados locales, aeropuertos, viajes programados y entregas con atención las 24 horas.":
    "Local rides, airport trips, scheduled rides, and deliveries with 24-hour service.",
  "Llamar ahora": "Call Now",
  "Pedir Taxi": "Request a Taxi",
  "Siempre en movimiento": "Always on the move",
  "Valoración": "Rating",
  "Tiempo promedio": "Average wait",
  "Servicio disponible": "Service available",
  "AEROPUERTOS": "AIRPORTS",
  "CENTRO": "DOWNTOWN",
  "TODO DALLAS": "ALL OF DALLAS",
  "Tarifas Oficiales HI TAXI": "HI TAXI Official Rates",
  "Calculadora de Tarifas y Estimador": "Fare Calculator and Estimator",
  "Precios claros y servicio confiable las 24 horas en todo el área de Dallas y DFW.":
    "Clear pricing and reliable 24-hour service throughout Dallas and the DFW area.",
  "Punto de Recogida": "Pickup Location",
  "Dirección, trabajo u hotel": "Address, workplace, or hotel",
  "Destino": "Destination",
  "DFW Aeropuerto Terminal A-E": "DFW Airport Terminals A–E",
  "Aeropuerto o destino en Dallas": "Airport or destination in Dallas",
  "Tipo de Vehículo": "Vehicle Type",
  "Sedán (1-4 Pasajeros)": "Sedan (1–4 passengers)",
  "SUV (1-4 Pasajeros)": "SUV (1–4 passengers)",
  "Van Aeropuerto (1-7 Pasajeros)": "Airport Van (1–7 passengers)",
  "Calculando...": "Calculating...",
  "$2.50 Base + $2.50/Milla (DFW Mínimo $32.00)":
    "$2.50 base + $2.50/mile (DFW minimum $32.00)",
  "📏 Distancia:": "📏 Distance:",
  " | ⏱️ Tiempo apróx: ": " | ⏱️ Approx. time: ",
  " min": " min",
  "No se pudo verificar la ruta; el precio mostrado es una referencia.":
    "We couldn't verify the route; the displayed price is an estimate.",
  "Calcular tarifa": "Calculate Fare",
  "Llama y reserva": "Call to Book",
  "VIAJA CON HI TAXI": "RIDE WITH HI TAXI",
  "Tu taxi en Dallas, cuando lo necesitas": "Your Dallas taxi, when you need it",
  "Servicio las 24 horas para tus viajes diarios, salidas y traslados al aeropuerto.":
    "24-hour service for your daily rides, outings, and airport transfers.",
  "Servicio 24/7": "24/7 Service",
  "Pide tu taxi a cualquier hora. Nuestro equipo coordina tu viaje y te mantiene informado.":
    "Request a taxi anytime. Our team coordinates your ride and keeps you informed.",
  "Conocemos tu zona": "We Know Your Area",
  "Conductores familiarizados con Dallas, Irving, Webb Chapel y las áreas donde prestamos servicio.":
    "Drivers familiar with Dallas, Irving, Webb Chapel, and the areas we serve.",
  "Tarifas claras": "Clear Fares",
  "Viaja con información sobre nuestras tarifas y opciones de pago antes de salir.":
    "Know our fares and payment options before your ride.",
  "Viajes al aeropuerto": "Airport Rides",
  "Te llevamos a DFW y Dallas Love Field, con espacio para tu equipaje según el vehículo.":
    "We take you to DFW and Dallas Love Field, with luggage space depending on the vehicle.",
  "Vehículos seguros, cómodos y listos para llevarte a tu destino.":
    "Safe, comfortable vehicles ready to take you to your destination.",
  "HI TAXI ofrece diferentes opciones de vehículos para traslados locales, viajes programados y servicios a los aeropuertos de Dallas.":
    "HI TAXI offers different vehicles for local rides, scheduled trips, and service to Dallas airports.",
  "Sedanes": "Sedans",
  "Ideales para viajes diarios, traslados al trabajo, citas y recorridos dentro de la ciudad.":
    "Ideal for daily rides, commutes, appointments, and trips around the city.",
  "Viajes Urbanos Estándar": "Standard City Rides",
  "Capacidad: 1 - 4 Pasajeros": "Capacity: 1–4 passengers",
  "Equipaje: 2 Maletas Grandes + 2 de Mano": "Luggage: 2 large bags + 2 carry-ons",
  "Pago: Efectivo, Tarjeta, Zelle": "Payment: Cash, card, Zelle",
  "Bajada de bandera base: $2.50 | Tarifa local estándar":
    "Base fare: $2.50 | Standard local rate",
  "SUV": "SUV",
  "Ofrecen mayor espacio para pasajeros y equipaje. Son ideales para familias, grupos pequeños y viajes al aeropuerto.":
    "More room for passengers and luggage. Ideal for families, small groups, and airport trips.",
  "Espacio y comodidad en cada viaje": "Space and comfort on every ride",
  "Equipaje: 4 Maletas Grandes": "Luggage: 4 large bags",
  "Vans": "Vans",
  "Nuestra opción más amplia para grupos grandes, familias y pasajeros con mayor cantidad de equipaje.":
    "Our most spacious option for larger groups, families, and passengers with extra luggage.",
  "Familias y Equipaje Pesado": "Families and Extra Luggage",
  "Capacidad: 1 - 7 Pasajeros": "Capacity: 1–7 passengers",
  "Solicitar un viaje": "Request a Ride",
  "Seguridad y comodidad": "Safety and Comfort",
  "Vehículos autorizados y asegurados.": "Licensed and insured vehicles.",
  "Unidades limpias y en buenas condiciones.": "Clean, well-maintained vehicles.",
  "Aire acondicionado para mayor comodidad.": "Air conditioning for your comfort.",
  "Conductores autorizados para prestar servicio.": "Drivers authorized to provide service.",
  "Diferentes opciones de vehículos según disponibilidad.":
    "Different vehicle options subject to availability.",
  "* El tipo y tamaño del vehículo asignado dependerá de la disponibilidad y las necesidades del servicio.":
    "* Vehicle type and size depend on availability and service needs.",
  "¿Necesitas un vehículo con más espacio?": "Need a vehicle with more space?",
  "Comunícate con nuestro equipo al solicitar tu taxi para verificar la disponibilidad.":
    "Contact our team when requesting your taxi to check availability.",
  "Consultar Disponibilidad": "Check Availability",
  "Gama Integral": "Full-Service Transportation",
  "Soluciones de Transporte a Tu Medida": "Transportation Solutions Tailored to You",
  "Desliza para explorar nuestros servicios, desde viajes locales hasta reservas especiales.":
    "Scroll to explore our services, from local rides to special bookings.",
  "Anterior servicio": "Previous service",
  "Siguiente servicio": "Next service",
  "SERVICIO 01": "SERVICE 01",
  "Traslados Locales": "Local Rides",
  "Viajes rápidos y confiables hacia hogares, trabajos, escuelas y cualquier destino dentro de nuestra zona de servicio.":
    "Fast, reliable rides to homes, workplaces, schools, and destinations throughout our service area.",
  "Unidades disponibles en vecindarios clave de Dallas": "Vehicles available in key Dallas neighborhoods",
  "Atención personalizada y conductores profesionales": "Personalized service and professional drivers",
  "Opciones de pago: efectivo, tarjeta y Zelle": "Payment options: cash, card, and Zelle",
  "Solicitar Traslado Local": "Request a Local Ride",
  "MÁS SOLICITADO": "MOST POPULAR",
  "Aeropuertos (DFW y Love Field)": "Airports (DFW and Love Field)",
  "Traslados hacia y desde el Aeropuerto Internacional DFW y Dallas Love Field. Puedes reservar con anticipación y solicitar una cotización.":
    "Rides to and from DFW International Airport and Dallas Love Field. Book ahead and request a quote.",
  "Precios de tarifa plana directa con peajes incluidos": "Direct flat-rate pricing with tolls included",
  "Rastreo de vuelos en vivo y asistencia con equipaje": "Live flight tracking and luggage assistance",
  "Sedanes, minivans y SUVs ejecutivas disponibles": "Sedans, minivans, and executive SUVs available",
  "Reservar Taxi al Aeropuerto": "Book an Airport Taxi",
  "SERVICIO 03": "SERVICE 03",
  "Viajes Programados": "Scheduled Rides",
  "Reserva tu taxi con anticipación para ir al trabajo, citas médicas, reuniones, consulados u otros compromisos importantes.":
    "Book ahead for work, medical appointments, meetings, consulates, or other important commitments.",
  "Reserva anticipada para la fecha y hora solicitada": "Book ahead for your requested date and time",
  "Confirmación del servicio antes del despacho de la unidad": "Service confirmation before dispatch",
  "Ideal para citas, trabajo y compromisos importantes": "Ideal for appointments, work, and important commitments",
  "Programar un Viaje": "Schedule a Ride",
  "SERVICIO 04": "SERVICE 04",
  "Compras y Diligencias": "Shopping and Errands",
  "Servicio para supermercados, lavanderías, centros comerciales, tiendas y otras diligencias personales.":
    "Rides to supermarkets, laundromats, shopping centers, stores, and other errands.",
  "Espacio de maletero amplio para bolsas y compras": "Spacious trunk for bags and shopping",
  "Tiempo de espera flexible durante tus recados": "Flexible wait times while you run errands",
  "Asistencia de carga y descarga por el conductor": "Driver assistance loading and unloading",
  "Solicitar Taxi para Compras": "Request a Shopping Trip",
  "SERVICIO 05": "SERVICE 05",
  "Entretenimiento y Vida Nocturna": "Entertainment and Nightlife",
  "Traslados hacia restaurantes, cines, bares, eventos y zonas de entretenimiento, con servicio disponible durante la noche.":
    "Rides to restaurants, theaters, bars, events, and entertainment areas, with service available at night.",
  "Retorno seguro a casa de noche y madrugada": "A safe ride home late at night",
  "Transporte a zonas populares (Downtown, Escapade 2001 y 2009, Harry Hines, etc.)":
    "Rides to popular areas (Downtown, Escapade 2001 and 2009, Harry Hines, etc.)",
  "Atención rápida para recogidas y traslados": "Prompt pickups and rides",
  "Solicitar Taxi Nocturno": "Request a Night Ride",
  "SERVICIO 06": "SERVICE 06",
  "Delivery": "Delivery",
  "Recogemos y entregamos tus pedidos, paquetes pequeños y documentos de forma rápida y confiable.":
    "We quickly and reliably pick up and deliver your orders, small packages, and documents.",
  "Recogida de pedidos en restaurantes y comercios": "Pickups from restaurants and businesses",
  "Transporte seguro de paquetes pequeños": "Safe transport for small packages",
  "Entrega rápida y confiable de documentos": "Fast, reliable document delivery",
  "Solicitar Delivery": "Request a Delivery",
  "Atención Personalizada": "Personalized Service",
  "¿Necesitas un Servicio Especial?": "Need a Special Service?",
  "Comunícate con nuestro equipo para verificar disponibilidad y solicitar una cotización a tu medida.":
    "Contact our team to check availability and request a personalized quote.",
  "Cotizaciones para viajes fuera de la ciudad o larga distancia": "Quotes for out-of-town or long-distance rides",
  "Atención especial para grupos corporativos": "Special service for corporate groups",
  "Soporte directo las 24 horas del día": "Direct support, 24 hours a day",
  "Consultar Servicio Especial": "Ask About Special Services",
  "ÚNETE A NUESTRA RED DE CONDUCTORES": "JOIN OUR DRIVER NETWORK",
  "Conduce con HI TAXI": "Drive with HI TAXI",
  "Forma parte de nuestra red de conductores independientes en Dallas y trabaja con tu propio vehículo.":
    "Join our network of independent drivers in Dallas and work with your own vehicle.",
  "Recibe servicios asignados por nuestro equipo de despacho": "Receive rides assigned by our dispatch team",
  "Recibe el pago directamente por cada servicio": "Get paid directly for every ride",
  "Soporte de despacho disponible 24/7": "24/7 dispatch support",
  "Nombre Completo": "Full Name",
  "Teléfono Móvil": "Mobile Phone",
  "Ciudad / Zona": "City / Area",
  "Año del Vehículo": "Vehicle Year",
  "VEHÍCULO / LICENCIA DE CONDUCIR": "VEHICLE / DRIVER'S LICENSE",
  "Tengo vehículo propio (2013 en adelante) y ya cuento con licencia de conducir.":
    "I have my own vehicle (2013 or newer) and a valid driver's license.",
  "Necesito un vehículo de la flota de Hi Taxi (Alquiler) y ya cuento con licencia de conducir.":
    "I need to rent a vehicle from the Hi Taxi fleet and have a valid driver's license.",
  "Tengo vehículo propio (2013 en adelante) y necesito obtener mi licencia de conducir.":
    "I have my own vehicle (2013 or newer) and need to obtain my driver's license.",
  "Necesito un vehículo de la flota de Hi Taxi (Alquiler) y necesito obtener mi licencia de conducir.":
    "I need to rent a vehicle from the Hi Taxi fleet and need to obtain my driver's license.",
  "Enviando solicitud...": "Sending application...",
  "Postularse para Conducir": "Apply to Drive",
  "ej. Samuel Rodríguez": "e.g. Samuel Rodriguez",
  "ej. Dallas": "e.g. Dallas",
  "ej. Sedán, SUV": "e.g. Sedan, SUV",
  "ej. 2020": "e.g. 2020",
  "(214) 555-0192": "(214) 555-0192",
  "No se pudo calcular la tarifa.": "The fare could not be calculated.",
  "Error al conectar con el servidor. Inténtalo de nuevo.":
    "Error connecting to the server. Please try again.",
  "Origen y destino son requeridos": "Pickup and destination are required.",
  "El origen y el destino no pueden ser iguales":
    "Pickup and destination cannot be the same.",
  "Error de configuración del servidor. Contacte al administrador.":
    "Server configuration error. Please contact the administrator.",
  "No se encontró una ruta entre esos lugares o la dirección no es válida. Verifica e intenta nuevamente.":
    "No route was found between those locations, or the address is invalid. Please check it and try again.",
  "Error interno al calcular la tarifa": "Internal error calculating the fare.",
  "El servicio de mapas devolvió una respuesta inválida.":
    "The maps service returned an invalid response.",
  "El servicio de mapas devolvió una ruta inválida.":
    "The maps service returned an invalid route.",
  "El servicio de mapas devolvió datos de ruta inválidos.":
    "The maps service returned invalid route data.",
  "Ocurrió un error al enviar la solicitud.":
    "An error occurred while submitting the application.",
  "Faltan campos obligatorios (Nombre o Teléfono)":
    "Required fields are missing (name or phone).",
  "Error interno al enviar la solicitud": "Internal error submitting the application.",
  "¡Solicitud recibida! Un gerente de flota se comunicará contigo hoy.":
    "Application received! A fleet manager will contact you today.",
  "Línea Directa: (214) 893-6969": "Direct Line: (214) 893-6969",
  "Redes sociales": "Social media",
  "© 2026 Hi Taxi, Dallas. Todos los derechos reservados. Operador de Taxi Autorizado en Dallas.":
    "© 2026 Hi Taxi, Dallas. All rights reserved. Licensed taxi operator in Dallas.",
  "Brindando servicio en Dallas, Irving, Webb Chapel y Aeropuerto DFW.":
    "Serving Dallas, Irving, Webb Chapel, and DFW Airport.",
};

function subscribeToLanguageChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("hi-taxi-language-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("hi-taxi-language-change", onStoreChange);
  };
}

function getLanguageSnapshot(): Language {
  return window.localStorage.getItem("hi-taxi-language") === "en" ? "en" : "es";
}

function getServerLanguageSnapshot(): Language {
  return "es";
}

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguageChanges,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    window.localStorage.setItem("hi-taxi-language", nextLanguage);
    window.dispatchEvent(new Event("hi-taxi-language-change"));
  }, []);
  const t = useCallback(
    (text: string) => (language === "en" ? translations[text] ?? text : text),
    [language],
  );
  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
