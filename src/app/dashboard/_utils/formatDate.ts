export const formaDate = (date: Date | string | undefined): string => {
    // Si la date est undefined ou invalide, on retourne une chaîne vide ou un message d'erreur
    if (!date || isNaN(new Date(date).getTime())) {
      return "Date invalide";
    }
  
    // Si la date est valide, on la formate
    const parsedDate = new Date(date);
  
    return parsedDate.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  export const monthToNumber = (month: string): number | null => {
    const monthsInFrench = [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];
  
    const monthIndex = monthsInFrench.indexOf(month.toLowerCase());
  
    return monthIndex !== -1 ? monthIndex + 1 : null;
  };
  