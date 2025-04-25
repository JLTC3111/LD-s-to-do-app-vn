export function Tabs(props) {
    const { todos, selectedTab, setSelectedTab } = props
    
    const tabs = ['Tất Cả', 'Chưa Làm', 'Đã Làm']

    return (
        <nav className="tab-container">
            {tabs.map((tab, tabIndex) => {
                const numOfTasks = tab === 'Tất Cả' ? 
                todos.length :
                tab === 'Chưa Làm' ?
                        todos.filter(val => !val.complete).length : 
                        todos.filter(val => val.complete).length

                return (
                    <button onClick={() => {
                        setSelectedTab(tab)
                    }}key={tabIndex} 
                    className={"tab-button " + (tab == selectedTab ? ' tab-selected' : ' ')} >
                    <h4>{tab} <span>({numOfTasks})</span></h4>
                    </button>
                )
            })}
            <hr />
        </nav>
    )
} 

