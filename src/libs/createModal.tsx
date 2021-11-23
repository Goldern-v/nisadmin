import * as React from "react";
import { message } from "antd";

/**
 * 通过调用createModal函数，传入一个模态窗口组件，返回对象{ show: [Function], hide: [Function], Component: [React.Component] }
 *
 * @example：
 * class App extends React.Component {
 *   modal = createModal(SomeModalComponent)
 *
 *   render () {
 *     return (
 *       <div>
 *         <button onClick={() => this.modal.show('标题')}>show</button>
 *         <this.modal.Component/>
 *       </div>
 *     )
 *   }
 * }
 *
 * @description：
 * - modal.show函数用于显示窗口
 * - modal.hide函数用于隐藏窗口
 * - modal.Component为窗口组件
 */

/** 模态窗口组件属性 */
export type ModalComponentProps<O = any> = {
  visible: boolean;
  onOk: (output: O) => any;
  onCancel: () => any;
  onClose: () => any;
};

/** 模态窗口组件类型 */
export type ModalComponentType<
  O,
  I extends ModalComponentProps<O>
> = React.ComponentType<I>;

/** 模态窗口组件自有属性（除去ModalComponentProps的剩余属性） */
type ModalOwnProps<P> = Pick<
  P,
  Exclude<keyof P, keyof ModalComponentProps<any>>
>;

/** 模态窗口回调 */
type ModalCallback<O> = (output: O) => any | Promise<any>;

/** 包装组件内部状态 */
interface WrapperState<I> {
  visible: boolean;
  loading: boolean;
  input?: I;
}

/** 创建模态窗口 */
export default function createModal<
  O = any,
  I extends ModalComponentProps<O> = any
>(OriginalComponent: ModalComponentType<O, I>) {
  let instance: any = null;

  return {
    show(props?: ModalOwnProps<I>, callback?: ModalCallback<O>) {
      if (instance) instance.show(props, callback);
    },
    hide() {
      if (instance) instance.hide();
    },
    Component: class extends React.Component<any, WrapperState<I>> {
      private callback?: ModalCallback<O>;

      public constructor(props: any) {
        super(props);

        if (instance) {
          console.warn("同一个模态窗口组件只能有一个实例");
        } else {
          instance = this;
        }

        this.state = {
          visible: false,
          loading: false,
        };
      }

      // 显示，将传入参数作为当前实例的内部状态
      public show = (input: any, callback: ModalCallback<O>) => {
        this.setState({ visible: true, loading: false, input });

        this.callback = callback;
      };

      // 关闭
      public hide = () => {
        this.setState({ visible: false });
      };

      // 确定，并调用回调函数，根据结果判断是否关闭窗口
      // 若该回调函数返回字符串，阻止关闭窗口，并将字符串作为错误信息提示，否则关闭窗口
      private onConfirm = (output: O) => {
        if (this.state.loading) return;

        this.setState({ loading: true });
        let result = this.callback ? this.callback(output) : true;
        if (!(result instanceof Promise)) result = Promise.resolve(result);

        result.then((r: any) => {
          if (r) {
            if (typeof r === "string") {
              message.error(r);
            } else if (r instanceof Error) {
              message.error(r.message);
            } else {
              console.error(r);
            }
            this.setState({ loading: false });
          } else {
            this.hide();
          }
        });
      };

      // 取消，并关闭窗口
      private onCancel = () => {
        this.hide();
      };

      // 关闭窗口
      private onClose = () => {
        this.hide();
      };

      // 渲染，传入状态和事件
      public render() {
        const { visible, input } = this.state;
        const props: any = { ...this.props, visible, onHide: this.hide };
        return (
          <OriginalComponent
            {...input}
            {...props}
            onOk={this.onConfirm}
            onCancel={this.onCancel}
            onClose={this.onClose}
          />
        );
      }
    },
  };
}
