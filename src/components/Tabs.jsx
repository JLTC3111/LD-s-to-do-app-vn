export function Tabs(props) {
    const { todos, selectedTab, setSelectedTab } = props;
  
    const tabs = ['Tất Cả', 'Chưa Làm', 'Đã Làm'];
  
    return (
      <nav className="tab-container">
        {tabs.map((tab, tabIndex) => {
          let numOfTasks = 0;
  
          if (tab === 'Tất Cả') {
            numOfTasks = todos.length;
          } else if (tab === 'Chưa Làm') {
            numOfTasks = todos.filter(val => !val.complete).length;
          } else if (tab === 'Đã Làm') {
            numOfTasks = todos.filter(val => val.complete).length;
          }
  
          return (
            <button
              key={tabIndex}
              onClick={() => setSelectedTab(tab)}
              className={"tab-button " + (tab === selectedTab ? 'tab-selected' : '')}
            >
              <h4>{tab} <span>({numOfTasks})</span></h4>
            </button>
          );
        })}
        <hr />
      </nav>
    );
  }