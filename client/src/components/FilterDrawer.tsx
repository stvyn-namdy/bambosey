// client/src/components/FilterDrawer.tsx
"use client";

import { Fragment } from "react";

interface Group<Item = string> {
  title: string;
  items: { key: Item; label: string }[];
  selected: Item[];
  onChange: (v: Item) => void;
}

interface Props {
  open: boolean;
  onClose: () => void;
  groups: Group<any>[];
}

export default function FilterDrawer({ open, onClose, groups }: Props) {
  if (!open) return null;
  return (
    <Fragment>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-xl z-50 flex flex-col text-gray-900">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded"
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>

        <div className="overflow-auto flex-1 px-4 py-6 space-y-6">
          {groups.map(({ title, items, selected, onChange }) => (
            <div key={title}>
              <h3 className="font-medium mb-2 text-gray-800">{title}</h3>
              <ul className="space-y-2">
                {items.map(({ key, label }) => (
                  <li key={String(key)}>
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selected.includes(key)}
                        onChange={() => onChange(key)}
                        className="h-4 w-4 text-black border-gray-300 rounded"
                      />
                      <span>{label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
