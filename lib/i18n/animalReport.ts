const animalReportNames = new Set([
  "animal sick/death",
  "ສັດປ່ວຍ/ຕາຍ",
  "ລາຍງານສັດປ່ວຍ/ຕາຍ",
  "ລາຍງານ ສັດປ່ວຍຕາຍ",
]);

export const isAnimalSickDeathReport = (name?: string | null): boolean =>
  !!name && animalReportNames.has(name.trim().toLowerCase());

export const animalReportNameKey = (name?: string | null) =>
  isAnimalSickDeathReport(name) ? "animalReport.name" : undefined;

const metricIds = new Set([
  "num_household",
  "num_total_animal",
  "num_sick",
  "num_dead",
  "num_recover",
]);

export const animalMetricKey = (name: string | undefined, id: string) =>
  isAnimalSickDeathReport(name) && metricIds.has(id)
    ? `animalReport.metric.${id}`
    : undefined;

export const animalCloseFieldKeys = (name: string | undefined, id?: string) => {
  if (!isAnimalSickDeathReport(name)) return undefined;
  if (id === "test_result" || id === "stamp_out") {
    return {
      label: `animalReport.close.${id}.label`,
      description: `animalReport.close.${id}.description`,
    };
  }
  return undefined;
};
