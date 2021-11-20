import { Tab, Tabs } from 'react-bootstrap';
import { FileListItem } from '../../apis/file/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './FileTabList.scss';
import classNames from 'classnames';

// component props
type Props = {
  tabFileList: FileListItem[];
  activeFileId?: string;
  unsaveFileIdList: string[];
  onFileTabClick: (id: string) => void;
  onCloseFileTab: (id: string) => void;
};

const FileTabList = (props: Props) => {
  const { tabFileList, activeFileId, unsaveFileIdList, onFileTabClick, onCloseFileTab } = props;

  return (
    <Tabs
      defaultActiveKey=""
      className="file-tab-list"
      variant="pills"
      activeKey={activeFileId}
      onSelect={(fileId) => fileId && onFileTabClick(fileId)}
    >
      {tabFileList.map((item) => {
        // 动态拼接 class
        const fileTabListItemClassName = classNames([
          'nav-link',
          'file-tab-list-item',
          activeFileId === item.id && 'active',
        ]);

        return (
          <Tab
            key={item.id}
            eventKey={item.id}
            title={
              <div className={fileTabListItemClassName}>
                {/* file title */}
                <span className="me-2">{item.title}</span>
                {/* icon container */}
                <div className="icon-container">
                  {/* close icon */}
                  <div
                    className="close-icon-container"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseFileTab(item.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} className="icon" />
                  </div>
                  {/* unsave icon */}
                  {unsaveFileIdList.includes(item.id) && (
                    <div className="unsave-icon-container">
                      <div className="icon"></div>
                    </div>
                  )}
                </div>
              </div>
            }
          />
        );
      })}
    </Tabs>
  );
};

export default FileTabList;
