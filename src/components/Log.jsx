// Log 組件，用於顯示遊戲的回合記錄
export default function Log({ turns }) {
  return (
      // 使用有序列表呈現遊戲回合記錄
      <ol id='log'>
          {/* 使用 map 方法遍歷每個回合，生成相對應的列表項 */}
          {turns.map((turn) => (
              // 為了確保每個列表項有唯一的 key，使用回合中的方格座標作為 key
              <li key={`${turn.square.row} ${turn.square.col}`}>
                  {/* 顯示玩家的動作，包括玩家標誌、選擇的方格座標 */}
                  {turn.player} 選擇了 {turn.square.row},{turn.square.col}
              </li>
          ))}
      </ol>
  );
}




// 1. **`Log` 組件：** 這是一個函數式組件，用來呈現遊戲的回合記錄。

// 2. **`turns` 參數：** 接收一個名為 `turns` 的參數，這是一個包含遊戲回合信息的陣列。

// 3. **有序列表 (`<ol>`):** 使用 `<ol>` 元素來呈現有序列表，這裡的 `id` 設為 'log'。

// 4. **`turns.map` 方法：** 使用 `map` 方法遍歷每個回合，為每個回合創建一個列表項。

// 5. **`<li>` 元素：** 每個列表項顯示了玩家的動作，包括玩家的標誌 (`turn.player`) 以及選擇的方格座標 (`turn.square.row` 和 `turn.square.col`)。

// 6. **`key` 屬性：** 為了確保 React 正確識別每個列表項，使用回合中的方格座標作為唯一的 `key`。