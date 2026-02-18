"use client";

import { useEffect, useMemo, useState } from "react";

interface MasonryGridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
}

function getColumnCount(width: number) {
  if (width >= 1280) {
    return 4;
  }

  if (width >= 768) {
    return 3;
  }

  return 2;
}

export default function MasonryGrid<T>({ items, renderItem, getKey }: MasonryGridProps<T>) {
  const [columnCount, setColumnCount] = useState<number>(2);

  useEffect(() => {
    const updateColumns = () => {
      setColumnCount(getColumnCount(window.innerWidth));
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  const columns = useMemo(() => {
    const distributedColumns = Array.from({ length: columnCount }, () => [] as T[]);

    items.forEach((item, index) => {
      distributedColumns[index % columnCount].push(item);
    });

    return distributedColumns;
  }, [items, columnCount]);

  return (
    <section className="flex items-start gap-4 md:gap-5 xl:gap-6">
      {columns.map((column, columnIndex) => (
        <div
          key={`column-${columnIndex}`}
          className="flex min-w-0 flex-1 flex-col gap-4 md:gap-5 xl:gap-6"
        >
          {column.map((item) => (
            <div
              key={getKey(item)}
              className="min-w-0"
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
