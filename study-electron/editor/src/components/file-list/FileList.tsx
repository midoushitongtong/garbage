import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import './FileList.scss';
import { FileListItem } from '../../apis/file/types';
import { Form, ListGroup } from 'react-bootstrap';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useKeyPress from '../../hooks/useKeyPress';

// component props
type Props = {
  fileList: FileListItem[];
  onFileClick: (id: string) => void;
  onFileSaveEdit: (fileListItem: FileListItem) => void;
  onFileDelete: (id: string) => void;
};

const FileList = (props: Props) => {
  const { fileList, onFileClick, onFileSaveEdit, onFileDelete } = props;

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const inputActiveContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [editFileListItem, setEditFileListItem] = React.useState<FileListItem | null>(null);
  const [fileTitle, setFileTitle] = React.useState('');

  // 是否按下 enter
  const enterPressed = useKeyPress(['Enter']);
  // 是否按下 esc
  const escPressed = useKeyPress(['Escape', 'Esc']);
  // 如果切换到修改状态, 点击了外部区域, 关闭修改状态
  useOnClickOutside(inputActiveContainerRef, () => {
    if (editFileListItem) {
      closeEdit();
    }
  });

  // 切换到修改状态
  const toEdit = React.useCallback((fileListItem: FileListItem) => {
    setEditFileListItem(fileListItem);
    setFileTitle(fileListItem.title);
  }, []);

  // 关闭修改状态
  const closeEdit = React.useCallback(() => {
    if (editFileListItem && editFileListItem.isNew) {
      onFileDelete(editFileListItem.id);
    }

    setEditFileListItem(null);
    setFileTitle('');
  }, [editFileListItem, onFileDelete]);

  // 提交修改
  const submitEdit = React.useCallback(() => {
    if (editFileListItem) {
      // 标记此文件不再是新文件
      editFileListItem.isNew = false;
      onFileSaveEdit({
        ...editFileListItem,
        title: fileTitle,
      });
      closeEdit();
    }
  }, [closeEdit, editFileListItem, fileTitle, onFileSaveEdit]);

  // 每次切换到修改状态的时候: 光标 focus 到 input 上
  React.useEffect(() => {
    if (editFileListItem) {
      inputRef.current?.focus();
    }
  }, [editFileListItem]);

  // 处理按下 esc, enter
  React.useEffect(() => {
    if (escPressed) {
      closeEdit();
    } else if (enterPressed) {
      submitEdit();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterPressed, escPressed]);

  // 如果有新文件, 默认将此文件设置为编辑状态
  React.useLayoutEffect(() => {
    const newFile = fileList.find((item) => item.isNew);
    if (newFile) {
      toEdit(newFile);
    }
  }, [fileList, toEdit]);

  return (
    <div className="file-list">
      {fileList.length > 0 ? (
        <ListGroup>
          {fileList.map((item) => (
            <ListGroup.Item key={item.id} className="d-flex align-items-center file-list-item">
              {item.id !== editFileListItem?.id ? (
                <>
                  {/* markdown icon */}
                  <span className="me-2">
                    <FontAwesomeIcon className="icon" icon={faMarkdown} />
                  </span>
                  {/* file title */}
                  <span className="file-name me-2" onClick={() => onFileClick(item.id)}>
                    {item.title || '-'}
                  </span>
                  {/* edit button */}
                  <button className="icon-button" onClick={() => toEdit(item)}>
                    <FontAwesomeIcon className="icon" icon={faEdit} title="编辑" />
                  </button>
                  {/* delete button */}
                  <button className="icon-button" onClick={() => onFileDelete(item.id)}>
                    <FontAwesomeIcon className="icon" icon={faTrash} title="删除" />
                  </button>
                </>
              ) : (
                <>
                  <div
                    ref={inputActiveContainerRef}
                    className="d-flex align-items-center justify-content-between"
                  >
                    {/* file title input */}
                    <Form.Control
                      ref={inputRef}
                      type="text"
                      placeholder="文档名称"
                      className="file-title-input me-2"
                      value={fileTitle}
                      onChange={(e) => setFileTitle(e.target.value)}
                    />
                    {/* close button */}
                    <button className="icon-button" onClick={closeEdit}>
                      <FontAwesomeIcon className="icon" icon={faTimes} title="关闭" />
                    </button>
                  </div>
                </>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div className="empty-container">Current no file</div>
      )}
    </div>
  );
};

export default FileList;
