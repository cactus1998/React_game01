import { useState } from "react";

// Player 組件的主體
export default function Player({ initialname, symbol, isActive }) {
    // 使用 useState 鉤子來管理玩家名稱和編輯狀態
    const [playerName, setPlayerName] = useState(initialname);
    const [isEditing, setIsEditing] = useState(false);

    // 當編輯按鈕被點擊時觸發的函數
    function handleEditClick() {
        // 切換編輯狀態
        setIsEditing((editing) => !editing);
    }

    // 當玩家名稱變動時觸發的函數
    function handleChange(event) {
        // 更新玩家名稱
        setPlayerName(event.target.value);
    }

    // 判斷是否正在編輯，決定顯示玩家名稱或編輯框
    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
    }

    // 渲染 Player 組件的 JSX
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}



// 1. **useState 鉤子：** 使用 `useState` 鉤子來管理組件的兩個狀態，即玩家名稱 (`playerName`) 和編輯狀態 (`isEditing`)。

// 2. **handleEditClick 函數：** 處理編輯按鈕點擊事件，切換 `isEditing` 的值，從而控制是否顯示編輯框。

// 3. **handleChange 函數：** 處理編輯框內容變動事件，更新 `playerName` 狀態。

// 4. **條件渲染玩家名稱或編輯框：** 根據 `isEditing` 的值，動態選擇要渲染的元素，顯示玩家名稱或可編輯的輸入框。

// 5. **渲染 JSX：** 最後，渲染 Player 組件的 JSX，包含玩家名稱（或編輯框）和玩家的遊戲標誌。同時，有一個按鈕，根據編輯狀態顯示 "Edit" 或 "Save"。