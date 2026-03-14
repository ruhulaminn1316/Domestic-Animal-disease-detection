// Teachable Machine এ যে class name দিয়েছ সেই নামে এখানে info রাখো
const diseaseDatabase = {
  "Foot Rot": {
    severity: "Moderate",
    action: "Clean + Isolate",
    about:
      "Foot rot is a contagious bacterial infection affecting cattle hooves, causing inflammation between the toes and severe lameness. Early treatment is crucial.",
    symptoms: [
      "Severe lameness and difficulty walking",
      "Swelling between the toes or around the hoof",
      "Foul-smelling discharge from the affected area",
      "Elevated body temperature (fever)",
      "Reduced appetite and weight loss",
    ],
    treatment: [
      "Clean and disinfect the affected hoof thoroughly",
      "Apply topical antibiotics (tetracycline or oxytetracycline)",
      "Administer systemic antibiotics as prescribed by a vet",
      "Isolate the affected animal to prevent spread",
      "Provide pain relief medication if necessary",
    ],
    prevention: [
      "Maintain dry and clean housing conditions",
      "Regular hoof trimming and inspection",
      "Footbath treatments for prevention",
      "Improve nutrition and immunity",
    ],
  },
  "Mastitis": {
    severity: "High",
    action: "Vet consultation urgent",
    about:
      "Mastitis is inflammation of the mammary gland, usually caused by bacterial infection. It is one of the most costly diseases in dairy cattle.",
    symptoms: [
      "Swollen, hot or painful udder",
      "Abnormal milk (clots, watery, blood-tinged)",
      "Reduced milk production",
      "Fever and loss of appetite",
      "The animal avoids being milked",
    ],
    treatment: [
      "Consult a veterinarian immediately",
      "Intramammary antibiotic infusion",
      "Strip affected quarters frequently",
      "Provide supportive care — fluids and anti-inflammatories",
      "Isolate the animal",
    ],
    prevention: [
      "Maintain strict milking hygiene",
      "Teat dipping after milking",
      "Dry cow therapy at end of lactation",
      "Regular udder health monitoring",
    ],
  },
  "Dermatitis": {
    severity: "Low",
    action: "Topical treatment",
    about:
      "Dermatitis is skin inflammation often caused by bacteria, fungi, parasites or irritants. Goats and sheep are commonly affected.",
    symptoms: [
      "Redness, swelling and itching of the skin",
      "Hair loss or scab formation",
      "Crusty or oozing lesions",
      "Animal rubbing against surfaces frequently",
      "Mild fever in severe cases",
    ],
    treatment: [
      "Clean affected area with antiseptic solution",
      "Apply topical antifungal or antibacterial cream",
      "Remove the irritant or parasite source",
      "Administer antihistamines if allergic reaction",
      "Keep wound dry and protected",
    ],
    prevention: [
      "Regular grooming and skin inspection",
      "Parasite control (dipping or sprays)",
      "Avoid wet and muddy housing",
      "Proper ventilation in animal sheds",
    ],
  },
  "Pneumonia": {
    severity: "High",
    action: "Immediate vet care",
    about:
      "Pneumonia is a respiratory infection affecting the lungs. It is common in young calves and sheep and can be fatal if untreated.",
    symptoms: [
      "Persistent cough and nasal discharge",
      "Rapid or labored breathing",
      "High fever (above 104°F)",
      "Depression and weakness",
      "Loss of appetite",
    ],
    treatment: [
      "Administer antibiotics as prescribed by a vet",
      "Provide anti-inflammatory drugs to reduce fever",
      "Ensure the animal is in a warm dry environment",
      "Supportive fluids if dehydrated",
      "Isolate from other animals",
    ],
    prevention: [
      "Vaccinate against common respiratory pathogens",
      "Ensure good ventilation and avoid overcrowding",
      "Colostrum feeding for newborns",
      "Reduce stress during weaning and transport",
    ],
  },
  "Healthy": {
    severity: "None",
    action: "No action needed",
    about:
      "The animal appears healthy with no visible signs of disease. Continue regular monitoring and preventive care.",
    symptoms: ["No signs of disease detected"],
    treatment: ["No treatment required at this time"],
    prevention: [
      "Regular health check-ups",
      "Maintain vaccination schedule",
      "Balanced nutrition and clean water",
      "Clean housing and parasite control",
    ],
  },
}

export function getDiseaseInfo(name) {
  return (
    diseaseDatabase[name] || {
      severity: "Unknown",
      action: "Consult a vet",
      about: "No detailed information available for this condition. Please consult a veterinarian.",
      symptoms: ["See a veterinarian for proper diagnosis"],
      treatment: ["Consult a qualified veterinarian"],
      prevention: ["Regular health check-ups and monitoring"],
    }
  )
}
