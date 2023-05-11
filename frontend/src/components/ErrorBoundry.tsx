import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
        logErrorToMyService(error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            // Можно отрендерить запасной UI произвольного вида
            return <h1>Что-то пошло не так.</h1>;
        }
        return this.props.children;
    }
}

function logErrorToMyService(error: Error, errorInfo: ErrorInfo) {
    // Здесь можно добавить логику для отправки ошибки на сервер или журнала ошибок
    console.error(error, errorInfo);
}

export default ErrorBoundary