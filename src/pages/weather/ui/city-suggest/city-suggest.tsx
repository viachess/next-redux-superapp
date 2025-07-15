import { FC, memo } from "react";

type Props = {
  list: { name: string; country: string }[] | undefined;
};

export const CitySuggest: FC<Props> = memo(({ list }) => {
  return (
    <ul className="list-none">
      {list?.map(({ name, country }) => {
        return (
          <li key={`${name}/${country}`} className="py-2 px-4">
            <h3>{name}</h3>
            <p>{country}</p>
          </li>
        );
      })}
    </ul>
  );
});

CitySuggest.displayName = "CitySuggest";
