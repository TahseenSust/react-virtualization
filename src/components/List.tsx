import styled from "@emotion/styled";
import React, { FC, useRef, useEffect, useState } from "react";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { SearchBar } from "./SearchBar";

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 500px;
  overflow: auto;
`;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

export interface ListProps {
  items: string[];
}

export const List: FC<ListProps> = ({ items }) => {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useScrollPosition(scrollWrapperRef);

  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  const visibleStartIndex = Math.floor(scrollPosition / 30);
  const visibleEndIndex = Math.min(
    visibleStartIndex + Math.ceil(500 / 30),
    items.length
  );

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredItems(filtered);
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.scrollTop = 0;
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <SearchBar onSearch={handleSearch} />
      <ScrollWrapper ref={scrollWrapperRef}>
        <ListWrapper
          style={{
            height: `${filteredItems.length * 30}px`,
            position: "relative",
            top: scrollPosition,
          }}
        >
          {/**
           * Note: `SafelyRenderChildren` should NOT be removed while solving
           * this interview. This prevents rendering too many list items and
           * potentially crashing the web page. This also enforces an artificial
           * limit (5,000) to the amount of children that can be rendered at one
           * time during virtualization.
           */}
          <SafelyRenderChildren>
            {filteredItems
              .slice(visibleStartIndex, visibleEndIndex)
              .map((word, index) => (
                <Item key={index}>{word}</Item>
              ))}
          </SafelyRenderChildren>
        </ListWrapper>
      </ScrollWrapper>
    </div>
  );
};
