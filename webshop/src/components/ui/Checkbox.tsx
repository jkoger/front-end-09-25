interface CheckBoxInterface {
  handleChecked: (_isChecked: boolean, key: string) => void;
  label: string;
  defaultChecked: boolean;
}

function Checkbox({ handleChecked, label, defaultChecked }: CheckBoxInterface) {
  return (
    <div className="items-center mb-4">
      <input
        defaultChecked={defaultChecked}
        onChange={(e) => handleChecked(e.target.checked, "active")}
        id="active-checkbox"
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="default-checkbox"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
