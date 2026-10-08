import {
  animalCloseFieldKeys,
  animalMetricKey,
  animalReportNameKey,
} from "lib/i18n/animalReport";

describe("Animal Sick/Death display translation keys", () => {
  it("uses stable metric and close-field ids for this report type", () => {
    expect(animalReportNameKey("Animal Sick/Death")).toBe("animalReport.name");
    expect(animalReportNameKey("ສັດປ່ວຍ/ຕາຍ")).toBe("animalReport.name");
    expect(animalReportNameKey(" ລາຍງານສັດປ່ວຍ/ຕາຍ")).toBe(
      "animalReport.name"
    );
    expect(animalMetricKey("Animal Sick/Death", "num_total_animal")).toBe(
      "animalReport.metric.num_total_animal"
    );
    expect(animalCloseFieldKeys("Animal Sick/Death", "test_result")).toEqual({
      label: "animalReport.close.test_result.label",
      description: "animalReport.close.test_result.description",
    });
  });

  it("leaves unrelated report types and unknown fields alone", () => {
    expect(animalReportNameKey("Human Illness")).toBeUndefined();
    expect(
      animalMetricKey("Human Illness", "num_total_animal")
    ).toBeUndefined();
    expect(animalCloseFieldKeys("Animal Sick/Death", "other")).toBeUndefined();
  });
});
