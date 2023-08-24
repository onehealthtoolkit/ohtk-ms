import {
  CalendarIcon,
  DocumentTextIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { TFieldValueType } from "./fieldViewModel";

const fieldIconClass = "h-8 w-8 text-gray-400";

export const getFieldIcon = (fieldType: TFieldValueType) => {
  switch (fieldType) {
    case "text":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
          className={fieldIconClass}
        >
          <path d="M290-160v-540H80v-100h520v100H390v540H290Zm360 0v-340H520v-100h360v100H750v340H650Z" />
        </svg>
      );
    case "integer":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
          className={fieldIconClass}
        >
          <path d="M220-360v-192h-60v-48h108v240h-48Zm132 0v-110q0-15 9.5-24.5T386-504h98v-48H352v-48h146q15 0 24.5 9.5T532-566v76q0 15-9.5 24.5T498-456h-98v48h132v48H352Zm248 0v-48h132v-48h-92v-48h92v-48H600v-48h146q15 0 24.5 9.5T780-566v172q0 15-9.5 24.5T746-360H600Z" />
        </svg>
      );
    case "location":
      return (
        <LocationMarkerIcon className={fieldIconClass}></LocationMarkerIcon>
      );
    case "textarea":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
          className={fieldIconClass}
        >
          <path d="M180-180h600v-375L555-780H180v600Zm0 60q-24.75 0-42.375-17.625T120-180v-600q0-24.75 17.625-42.375T180-840h400l260 260v400q0 24.75-17.625 42.375T780-120H180Zm99-171h402v-60H279v60Zm0-159h402v-60H279v60Zm0-159h276v-60H279v60Zm-99 429v-600 600Z" />
        </svg>
      );
    case "date":
      return <CalendarIcon className={fieldIconClass}></CalendarIcon>;
    case "decimal":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
          className={fieldIconClass}
        >
          <path d="m734-94-42-42 73-74H480v-60h285l-73-74 42-42 146 146L734-94ZM80-440v-100h100v100H80Zm300 0q-58 0-99-41t-41-99v-160q0-58 41-99t99-41q58 0 99 41t41 99v160q0 58-41 99t-99 41Zm360 0q-58 0-99-41t-41-99v-160q0-58 41-99t99-41q58 0 99 41t41 99v160q0 58-41 99t-99 41Zm-360.235-60Q413-500 436.5-523.333 460-546.667 460-580v-160q0-33.333-23.265-56.667Q413.471-820 380.235-820 347-820 323.5-796.667 300-773.333 300-740v160q0 33.333 23.265 56.667Q346.529-500 379.765-500Zm360 0Q773-500 796.5-523.333 820-546.667 820-580v-160q0-33.333-23.265-56.667Q773.471-820 740.235-820 707-820 683.5-796.667 660-773.333 660-740v160q0 33.333 23.265 56.667Q706.529-500 739.765-500Z" />
        </svg>
      );
    case "files":
      return <DocumentTextIcon className={fieldIconClass}></DocumentTextIcon>;
    case "images":
      return <PhotographIcon className={fieldIconClass}></PhotographIcon>;
    case "singlechoices":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
          className={fieldIconClass}
        >
          <path d="M480-294q78 0 132-54t54-132q0-78-54-132t-132-54q-78 0-132 54t-54 132q0 78 54 132t132 54Zm0 214q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
        </svg>
      );
    case "multiplechoices":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
          className={fieldIconClass}
        >
          <path d="m419-321 289-289-43-43-246 246-119-119-43 43 162 162ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z" />
        </svg>
      );
    case "subform":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
          className={fieldIconClass}
        >
          <path d="M180-120q-26 0-43-17t-17-43v-600q0-26 17-43t43-17h202q7-35 34.5-57.5T480-920q36 0 63.5 22.5T578-840h202q26 0 43 17t17 43v600q0 26-17 43t-43 17H180Zm0-60h600v-600h-60v90H240v-90h-60v600Zm300-600q17 0 28.5-11.5T520-820q0-17-11.5-28.5T480-860q-17 0-28.5 11.5T440-820q0 17 11.5 28.5T480-780Z" />
        </svg>
      );
  }
};
