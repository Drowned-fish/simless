export const lessStr = `
    @color: #f0f;

    /* 单行注释 */
    .a {
        color: #000;
        &.link {
            color: @color;
        }

        /**
         * 多行注释 
         */
        & .test {
            color: @color;
        }
        &:hover {
            color: red;
        }
        border: 1px solid @color;
    }
`

