/* eslint-disable @next/next/no-img-element */
export const renderData = (data: Record<string, any>) => {
  if (!data) {
    return null;
  }
  return (
    <table className="table-fixed border w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <tbody>{renderItem(data)}</tbody>
    </table>
  );
};

const renderItem = (data: Record<string, any>) => {
  return Object.keys(data)
    .sort()
    .filter(key => key != "images" && data[key] != null)
    .map((key: string) => {
      return (
        <tr
          key={key}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            {key}
          </th>
          <td className="px-6 py-4">{displayValue(data[key])}</td>
        </tr>
      );
    });
};

const displayValue = (value: any) => {
  if (typeof value != "object") {
    const val: string = value.toString();
    // Could be an image url
    if (val.match(/\.(png|jpg|jpeg|gif|tif|bmp)$/i)) {
      return (
        <div className="h-14 w-14 border rounded bg-gray-300 relative">
          <img
            src={val}
            alt="attachment"
            className="w-full h-full object-contain"
          />
        </div>
      );
    } else {
      return val;
    }
  } else {
    return renderData(value);
  }
};

export const TR = (props: { label: string; value: string }) => {
  const { label, value } = props;
  return (
    <tr className="flex bg-white border even:bg-slate-50 dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {label}
      </th>
      <td className="px-6 py-4">{value}</td>
    </tr>
  );
};
